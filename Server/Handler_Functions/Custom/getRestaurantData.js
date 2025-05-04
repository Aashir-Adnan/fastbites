const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const { executeQuery } = require('../../Database/queryExecution');
const executeQueryWithPagination = require('../../Database/executeQueryWithPagination');
const projectDB = require('../../Database/projectDb');
const getRD = async (req, res) => {
    try {
        let query = `SELECT r.* FROM restaurants r JOIN cuisines c ON r.cuisine_id = c.id WHERE c.cuisine_name = '${req.body.name}'`;

        const connection = projectDB()
        const insertedRecord = await executeQueryWithPagination(req, query, "", connection);
        sendResponse(res, 200, "Successfully Retrieved", insertedRecord);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, "An Error Occurred In The CRUD Get Handler Function", error.message);
    }
};

module.exports = getRD;
