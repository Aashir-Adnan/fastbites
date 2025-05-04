const projectDB = require('./projectDb');
const {executeQuery} = require('./queryExecution');

require('dotenv').config();

const getAttributes =  async (table_name)=>{
    const query = 
    `
       SELECT 
          c.COLUMN_NAME
        FROM INFORMATION_SCHEMA.COLUMNS c
        WHERE c.TABLE_SCHEMA = ? 
          AND c.TABLE_NAME = ?
    `
    const values = [process.env.DB_DATABASE, table_name]
    const connection = projectDB()
    const results = await executeQuery( query, values, connection)
    return results;
}


module.exports = getAttributes;