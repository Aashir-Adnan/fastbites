const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const projectDB = require('../../Database/projectDb');
const { executeQuery } = require('../../Database/queryExecution');

const crudDelete = async (req, res) => {
    try {
        const { resource } = req.params; // resource = table name
        const { id } = req.body;         // ID of the record to delete

        if (!resource || !id) {
            return sendResponse(res, 400, "Missing 'resource' or 'id' in request.");
        }

        // Fetch table columns
        const attributes = await getAttributes(resource);
        const primaryKeyCol = attributes.find(attr => attr.COLUMN_KEY === 'PRI');

        if (!primaryKeyCol) {
            return sendResponse(res, 400, `Primary key not found for table ${resource}`);
        }

        const query = `DELETE FROM ${resource} WHERE ${primaryKeyCol.COLUMN_NAME} = ?`;
        const connection = projectDB();
        const deletedRecord = await executeQuery(res, query, [id], connection);

        sendResponse(res, 200, "Successfully Deleted", deletedRecord);
    } catch (error) {
        sendResponse(res, 500, "An Error Occurred In The CRUD Delete Handler Function", error.message);
    }
};

module.exports = crudDelete;
