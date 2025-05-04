const jwt = require('jsonwebtoken');
const sendResponse=require("./response")

function generateToken(res,payload,secretKey) {
 
 try{ token=jwt.sign(payload, secretKey);
  return token
 }catch(err){
    throw new Error(err.message)
 }  
}

module.exports = generateToken;
