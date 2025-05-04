const logMessage = require("../Log_Functions/consoleLog");

async function executeQuery(res, query, values, connection,endConnection=true) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if(endConnection)
      {connection.end();}
      
      if (err) {
        
        logMessage(["Error Executing the Query:", err]);
        logMessage(["Query:", query]);
        logMessage(["With Values:", values]);
  
        reject(new Error("Error executing the query. Please try again later.::"+  err));
        return; 
      }

      
      resolve(result);
    });
  });
}

module.exports = { executeQuery };
