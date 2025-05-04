const logMessage = require('../Log_Functions/consoleLog.js');
const {decryptArray,decryptObject} = require('./Decryption.js');
async function sendResponse(res, status, message, payload, SCC = null) {
  if (payload && Array.isArray(payload)) {
    payload = await decryptArray(payload); 
  }
  console.log(message);
  res.setHeader('Content-Type', 'application/json');
   const response = {
    status: status,
    message: message,
    payload: payload,
    scc : SCC
  };
  
  res.status(status).json(response);
}

module.exports = sendResponse;