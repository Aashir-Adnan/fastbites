const getModel = require('../../data/modelFinder');

const getFileHandlerByModel = async (req, res, modelName) => {
    let model = await getModel(modelName);
    try {
        const response = await utils.getFile(model, req);
        utils.SendResponse(res, 200, "Success", response);
    } catch (error) {
        utils.ConsoleLog(error.message);
        utils.SendResponse(res, 500, 'An error occurred while processing the request', error.message);
    }
};

module.exports = getFileHandlerByModel;
