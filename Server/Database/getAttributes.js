const projectDB = require('./projectDb');
const {executeQuery} = require('./queryExecution');

const getAttributes =  async (table_name)=>{
    const query = 
    `
       SELECT 
          c.COLUMN_NAME, 
          c.COLUMN_KEY, 
          k.REFERENCED_TABLE_NAME, 
          k.REFERENCED_COLUMN_NAME, 
          k.CONSTRAINT_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS c
        LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k
          ON c.TABLE_SCHEMA = k.TABLE_SCHEMA 
          AND c.TABLE_NAME = k.TABLE_NAME 
          AND c.COLUMN_NAME = k.COLUMN_NAME
        WHERE c.TABLE_SCHEMA = ? 
          AND c.TABLE_NAME = ?
    `
    const values = ["loan_app", table_name]
    const connection = projectDB()
    const results = await executeQuery(null, query, values, connection)
    return results;
}


module.exports = getAttributes;