const sendResponse = require('../../Constants/response');
const getAttributes = require('../../Database/getAttributes');
const projectDB = require('../../Database/projectDb');
const { executeQuery } = require('../../Database/queryExecution');

const crudPost = async (req, res) => {
    try {
        console.log(req.body)
        const attributes = await getAttributes(req.body.table);
        const columnNames = attributes.filter(col => !["status", "created_at", "updated_at"].includes(col.COLUMN_NAME)).map(attribute => attribute.COLUMN_NAME);
        const columns = columnNames.join(", ");
        const values = req.body.entry.map(entry => {
            return `(${columnNames.map(col => {
                const value = entry[col] !== undefined ? `'${entry[col]}'` : 'NULL';
                return value;
            }).join(", ")})`;
        }).join(", ");
        
        let query = `INSERT INTO ${req.body.table} (${columns}) VALUES ${values}`;

        const connection = projectDB()
        const insertedRecord = await executeQuery(query, "", connection);

        sendResponse(res, '200', "Successfully Created", insertedRecord);
    } catch (error) {
        console.log(error)
        sendResponse(res, 500, "An Error Occurred In The CRUD Post Handler Function", error.message);
    }
};

module.exports = crudPost;
