const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const sendResponse = require('../Constants/response');

const routeMap = {

};
router.use('/:resource/:action?',  async (req, res) => {
    const resource = req.params.resource;
    const action = req.params.action;
    const method = req.method.toLowerCase(); 
    console.log(method, resource, action)
        try
        { 
            let handlerPath;
            const routeKey = `${resource} ${action}`;
            if (routeMap[routeKey]) {
                handlerPath = routeMap[routeKey];
                const handler = require(handlerPath);
                if (typeof handler === 'function') {
                    return handler(req, res);
                }
                return sendResponse(res, 400, 'Handler File Does Not Export A Function');
            } 
            else {
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Custom', `${resource}${action}.js`);

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
