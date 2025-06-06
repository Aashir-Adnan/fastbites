const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const sendResponse = require('../Constants/response');

const routeMap = {

};
router.use('/:resource/:action?',  async (req, res) => {
    const resource = req.params.resource;
    const method = req.method.toLowerCase(); 

        try
        { 
            let handlerPath;
            const routeKey = `${method} ${resource}`;
            if (routeMap[routeKey]) {
                handlerPath = routeMap[routeKey];
                const handler = require(handlerPath);
                if (typeof handler === 'function') {
                    return handler(req, res);
                }
                return sendResponse(res, 400, 'Handler File Does Not Export A Function');
            } 
            else {
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'CRUDS', `crud_${method}.js`);

                if (fs.existsSync(handlerPath)) {
                    const handler = require(handlerPath);
                    if (typeof handler === 'function') {
                        routeMap[routeKey] = handlerPath;
                        return handler(req, res);
                    }
                    return sendResponse(res, 400, 'Handler File Does Not Export A Function');
                }
            }
            

            return sendResponse(res, 404, 'API Not Found');
        }
        catch (error) {
            return sendResponse(res, 400, error.message)
        }
});

module.exports = router;
