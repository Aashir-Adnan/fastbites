const express = require('express');
const fs = require('fs');
const path = require('path');
const { ConsoleLog, getRecordsByField} = require('../data/utils');
const { SendResponse } = require('../data/utils');
const router = express.Router();
const validatorFunction = require('../middleware/validatorFunction');
const checkUserPermission = require('../middleware/permissionValidator');



router.use('/:resource/:action?', validatorFunction, async (req, res, next) => {
    const resource = req.params.resource;
    const method = req.method.toLowerCase();

    try {
        let fileHandlerPath;
        switch (method) {
            case 'get':
                fileHandlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Get_File_Functions', 'fileHandler.js');                break;
            case 'post':
                handlerPath = path.join(__dirname, '..', 'Handler_Functions', 'Post_File_Functions', `filehandler.js`);
                break;
            default:
                return SendResponse(res, 400, 'Method Not Allowed');
        }
        if (fs.existsSync(fileHandlerPath)) {
            const fileHandler = require(fileHandlerPath);
            await fileHandler(req, res, resource);
        } else {
            SendResponse(res, 404, 'File Handler Not Found');
        }
    } catch (error) {
        ConsoleLog(error.message);
        SendResponse(res, 500, 'An Error Occurred Processing the Request', error.message);
    }
});

module.exports = router;
