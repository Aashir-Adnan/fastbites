
async function executeQuery(query, values, connection,endConnection=true) {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err, result) => {
      if(endConnection)
      {connection.end();}
      console.log(["Query:", query]);
      console.log(["With Values:", values]);
      if (err) {
        
        console.log(["Error Executing the Query:", err]);
  
        reject(new Error("Error executing the query. Please try again later.::"+  err));
        return; 
      }

      
      resolve(result);
    });
  });
}

module.exports = { executeQuery };
