const authMiddleware = require('./accessTokenValidator.js');
const checkUserPermission = require('./permissionValidator.js');
const path = require('path');
const sendResponse = require('../Constants/response.js');
const validatorFunction = async (req, res, next) => {
    try {
        const resource = req.params.resource;
        const method = req.method.toLowerCase(); 
        switch (method) {
            case 'get':
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Get_Functions', `${resource}.js`);
                break;
            case 'post':
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Post_Functions', `${resource}.js`);
                break;
            case 'put':
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Put_Functions', `${resource}.js`);
                break;
            case 'delete':
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Delete_Functions', `${resource}.js`);
                break;
            default:
                return sendResponse(res, 400, 'Method Not Allowed');
        }
        require(handlerPath);
        
        const globalObjectName = `middleware_${resource}_${method}`;
        console.log("Global Object Name: " + globalObjectName);

        const validationObject = global[globalObjectName];
        console.log(validationObject);

        if (!validationObject) {
            return sendResponse(res, 400, "Validation Failed", "Invalid resource type");
        }

        if (validationObject.permissions && validationObject.permissions.length > 0) {
            await checkUserPermission(req.body.Auth_URID, validationObject.permissions);
        }
        if (validationObject.requireAccessToken){
            await authMiddleware(req);
        }
        const { parameters } = validationObject;
        if (parameters) {
            for (const key of Object.keys(parameters)) {
                if (req.body.hasOwnProperty(key)) {
                    const { validations, required } = parameters[key];
        
                    if (required && (req.body[key] === undefined || req.body[key] === null)) {
                        return sendResponse(res, 400, `Missing required parameter: ${key}`);
                    }
        
                    if (validations && validations.length > 0) {
                        for (const validator of validations) {
                            try {
                                await validator(req.body[key]);
                            } catch (error) {
                                return sendResponse(res, 400, error.message);
                            }
                        }
                    }
                } else {
                    if (parameters[key].required) {
                        return sendResponse(res, 400, `Missing required parameter: ${key}`);
                    }
                }
            }
        }

        next(); 
    } catch (error) {
        sendResponse(res, 400, error.message);
    }
};

module.exports = validatorFunction;
