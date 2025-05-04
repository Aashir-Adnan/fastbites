const moment = require('moment');

function ifExpire(decoded, res) {
    const currentTimestamp = moment().unix();
    const expirationTimestamp = decoded.exp;

    if (expirationTimestamp <= currentTimestamp) {
        return true
    }
  return false;
}
module.exports = ifExpire;
