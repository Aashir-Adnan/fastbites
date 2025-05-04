const sendResponse = require('./response');
const jwt = require('jsonwebtoken');
const ifExpire = require('./expireToken');
function verifyToken(res, token,sendResponse=1) {
  let decoded; 
  try {
    const verifyOptions = { ignoreExpiration: true };
    decoded = jwt.verify(token,process.env.SECRET_KEY, verifyOptions);
    if (!ifExpire(decoded,res)) {
      return decoded; 
    }
    else{
      if(sendResponse==1)
      {
        const resp = {status: 401,message: 'Token has expired',payload: null};
        return sendResponse(res, resp.status, resp.message, resp.payload, "E40");
      }
      return false;
    }
  } catch (err) {
   if(sendResponse==1)
   {
    const resp = {status: 401,message: 'Invalid Token',payload: null};
    return sendResponse(res, resp.status, resp.message, resp.payload);
   }
    return false;
  }
}
module.exports = verifyToken;
 