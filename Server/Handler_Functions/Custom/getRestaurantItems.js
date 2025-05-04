const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const { executeQuery } = require('../../Database/queryExecution');
const executeQueryWithPagination = require('../../Database/executeQueryWithPagination');
const projectDB = require('../../Database/projectDb');
const getRD = async (req, res) => {
    try {
        let query = `SELECT i.* FROM restaurants r JOIN items i ON r.id = i.restaurant_id WHERE r.name = '${req.body.name}'`;

        const connection = projectDB()
        const insertedRecord = await executeQueryWithPagination(req, query, "", connection);
        sendResponse(res, 200, "Successfully Retrieved", insertedRecord);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, "An Error Occurred In The CRUD Get Handler Function", error.message);
    }
};

module.exports = getRD;
