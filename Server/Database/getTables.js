const projectDB = require('./projectDb');
const {executeQuery} = require('./queryExecution');

const getTables =  async ()=>{
    const query = 
    `
        SELECT TABLE_NAME
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = ?;
    `
    const values = ["loan_app"]
    const connection = projectDB()
    const results = await executeQuery(null, query, values, connection)
    return results;
}


module.exports = getTables;