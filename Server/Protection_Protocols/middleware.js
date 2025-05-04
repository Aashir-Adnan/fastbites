const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const logRequestToFile = (req, res, next) => {
    const logFilePath = path.join(__dirname, 'requests.log');
    const logDetails = `
        Time: ${new Date().toISOString()}
        Method: ${req.method}
        URL: ${req.originalUrl}
        Headers: ${JSON.stringify(req.headers)}
        Body: ${JSON.stringify(req.body)}
        Query: ${JSON.stringify(req.query)}
    `;

    fs.appendFile(logFilePath, logDetails + '\n', (err) => {
        if (err) {
            console.error('Failed to write request log:', err);
        }
    });

    next();
};

const rateLimits = {};
const sessionRateLimiter = (req, res, next) => {
    const sessionID = req.sessionID; 

    if (!rateLimits[sessionID]) {
        rateLimits[sessionID] = { count: 1, lastRequest: Date.now() };
    } else {
        const currentTime = Date.now();
        const elapsedTime = currentTime - rateLimits[sessionID].lastRequest;
        
        if (elapsedTime > 60000) {
            rateLimits[sessionID].count = 1;
            rateLimits[sessionID].lastRequest = currentTime;
        } else {
            rateLimits[sessionID].count++;
        }
    }

    if (rateLimits[sessionID].count > 100) {
        return res.status(429).send('Too many requests. Please try again later.');
    }

    next();
};

const applyMiddleware = (app) => {
    app.use(sessionRateLimiter);

    // Apply the logging middleware
    app.use(logRequestToFile);

    app.use(helmet());
    app.use(
        helmet.contentSecurityPolicy({
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        })
    );
    app.use(helmet.xContentTypeOptions());
    app.use(helmet.xFrameOptions({ action: 'deny' }));
    app.use(helmet.hsts({ maxAge: 31536000 })); // 1 year
    app.use(cors());
    app.use(bodyParser.json());

    // Uncomment the following block to enforce HTTPS
    // app.use((req, res, next) => {
    //     if (req.headers['x-forwarded-proto'] !== 'https') {
    //         return res.redirect(`https://${req.headers.host}${req.url}`);
    //     }
    //     next();
    // });
};

module.exports = applyMiddleware;
