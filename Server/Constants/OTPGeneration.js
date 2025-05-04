const otpGenerator = require('otp-generator');
const sendEmail = require('./sendEmailOTP');
const getDateTime = require('./getDateTime');
const projectDB = require('../databases/projectDb')
const { executeQuery } = require('../databases/queryExecution');
const logMessage = require('../LogFunctions/consoleLog');

async function OTPGeneration(res, email, deviceName) {
  try{
  let deviceId, otpResult;
  let connection = await projectDB();
  const OTP = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
  
  
  const [currentDateString, currentTimeString, currentDateTime] = getDateTime();

  
  const userQuery = `SELECT user_id FROM users WHERE email = ?`;
  const userResult = await executeQuery(res, userQuery, [email], connection);
  if (userResult.length === 0) {
    throw new Error("User not found with email " + email);
  }

  const userId = userResult[0].user_id;

  

const deviceIdQuery = `
  SELECT * 
  FROM user_devices 
  WHERE user_id = ?
`;
connection = await projectDB();
const deviceResult = await executeQuery(res, deviceIdQuery, [userId], connection);
deviceId = deviceResult[0].user_device_Id

if (deviceResult.length === 0) {
    
    const insertDeviceQuery = `
        INSERT INTO user_devices (user_id, device_token, device_name, platform_version_id, os_version)
        VALUES (?, ?, ?, ?, ?)
    `;
    connection = await projectDB();
    const insertDeviceResult = await executeQuery(res, insertDeviceQuery, [userId, null,  deviceName, null, null], connection);

    
    const newDeviceIdQuery = `
        SELECT user_device_id 
        FROM user_devices 
        WHERE device_name = ?
    `;
    connection = await projectDB();
    const newDeviceResult = await executeQuery(res, newDeviceIdQuery, [deviceName], connection);
    deviceId = newDeviceResult[0].user_device_id;

    deviceId = deviceResult[0].user_device_id;
    const otpQuery = `
      INSERT INTO device_otp (user_device_id, otp, otp_failure_count)
      VALUES (?,?,?)
    `;
    connection = await projectDB();
    otpResult = await executeQuery(res, otpQuery, [deviceId, OTP, currentDateTime, 0], connection);


} else {
    deviceId = deviceResult[0].user_device_id;
    const otpQuery = `
      UPDATE device_otp
      SET otp = ?
      WHERE user_device_id = ?
    `;
    connection = await projectDB();
    otpResult = await executeQuery(res, otpQuery, [OTP, deviceId], connection);

}





  
  if (otpResult.affectedRows === 0) {
    throw new Error("Failed to assign OTP. Device not associated with the user or invalid device ID.");
  }

  
  await sendEmail(email, OTP, res);

  return OTP;}
  catch (error){
    throw new Error(error.message);
  }
}

module.exports = OTPGeneration;
