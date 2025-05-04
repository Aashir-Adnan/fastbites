const sendResponse = require('../../Constants/response');
const projectDB = require('../../Database/projectDb');
const { executeQuery } = require('../../Database/queryExecution');
const crudPut = async (req, res) => {
    try {
        const { table, id, data } = req.body;

        if (!table || !id || !data || typeof data !== 'object') {
            return sendResponse(res, 400, "Missing or invalid parameters.");
        }
        const setClause = Object.entries(data)
            .map(([key, value]) => `${key} = ${typeof value === 'string' ? `'${value}'` : value}`)
            .join(', ');

        const query = `UPDATE ${table} SET ${setClause} WHERE id = ${id}`;

        const result = await executeQuery(query, "", projectDB())

        sendResponse(res, 200, "Successfully Updated", result);
    } catch (error) {
        sendResponse(res, 500, "An Error Occurred In The CRUD PUT Handler Function", error.message);
    }
};

module.exports = crudPut;
