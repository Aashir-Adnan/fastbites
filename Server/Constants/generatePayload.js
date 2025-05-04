const moment = require('moment');

const generatePayload = (userId, deviceId, OTP) => {
const expiration = moment().add(120,'minutes').unix();
  return {
    userId: userId,
    deviceId : deviceId,
    OTP: OTP,
    exp: expiration,
  };
};
module.exports = generatePayload;
