const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const { executeQuery } = require('../../Database/queryExecution');
const executeQueryWithPagination = require('../../Database/executeQueryWithPagination');
const projectDB = require('../../Database/projectDb');
const crudGet = async (req, res) => {
    try {
        let query = `SELECT * FROM ${req.params.resource}` + `${req.query.id ? " WHERE id = " + req.query.id : ""} `;

        const connection = projectDB()
        const insertedRecord = await executeQueryWithPagination(req, query, "", connection);
        sendResponse(res, 200, "Successfully Retrieved", insertedRecord);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, "An Error Occurred In The CRUD Get Handler Function", error.message);
    }
};

module.exports = crudGet;
