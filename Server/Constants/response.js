const {decryptArray,decryptObject} = require('./Decryption.js');
async function sendResponse(res, status, message, payload, SCC = null) {
  if (payload && Array.isArray(payload)) {
    payload = await decryptArray(payload); 
  }
  res.setHeader('Content-Type', 'application/json');
   const response = {
    status: status,
    message: message,
    payload: payload,
  };
  
  res.status(status).json(response);
}

module.exports = sendResponse;