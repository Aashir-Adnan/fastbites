const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const { executeQuery } = require('../../Database/queryExecution');
const executeQueryWithPagination = require('../../Database/executeQueryWithPagination');
const projectDB = require('../../Database/projectDb');
const crudPost = async (req, res) => {
    try {
        let query = `SELECT * FROM ${req.params.resource}`;

        const connection = projectDB()
        const insertedRecord = await executeQueryWithPagination(req, res, query, "", connection);

        sendResponse(res, '200', "Successfully Retrieved", insertedRecord);
    } catch (error) {
        sendResponse(res, 500, "An Error Occurred In The CRUD Post Handler Function", error.message);
    }
};

module.exports = crudPost;
