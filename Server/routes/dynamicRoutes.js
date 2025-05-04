const express = require('express');
const fs = require('fs');
const path = require('path');
const { SendResponse, ConsoleLog} = require('../data/utils');
const router = express.Router();
const validatorFunction = require('../middleware/validatorFunction');
const checkUserPermission = require('../middleware/permissionValidator');

const routeMap = {

};
router.use('/:resource/:action?', validatorFunction,  async (req, res, next) => {
    const resource = req.params.resource;
    const method = req.method.toLowerCase(); 

        try
        { 
            let handlerPath;
            const routeKey = `${method} ${resource}`;
            if (routeMap[routeKey]) {
                handlerPath = routeMap[routeKey];
                if (method != "post" && (resource != "signUp")){
                    await checkUserPermission(req, res, next);
                }
                const handler = require(handlerPath);
                if (typeof handler === 'function') {
                    return handler(req, res, next);
                }
                return SendResponse(res, 400, 'Handler File Does Not Export A Function');
            } 
            else {
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
                        return SendResponse(res, 400, 'Method Not Allowed');
                }
                if (fs.existsSync(handlerPath)) {
                    const handler = require(handlerPath);
                    if (typeof handler === 'function') {
                        routeMap[routeKey] = handlerPath;
                        return handler(req, res, next);
                    }
                    return SendResponse(res, 400, 'Handler File Does Not Export A Function');
                }
            }
            

            return SendResponse(res, 404, 'API Not Found');
        }
        catch (error) {
            return SendResponse(res, 400, error.message)
        }
});

module.exports = router;
