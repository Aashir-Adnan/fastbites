const verifyToken = require("./auth");
const generatePayload = require("./generatePayload");
const OTPGeneration = require("./OTPGeneration");
const generateToken = require('./jwtUtils');
const projectDB = require("../databases/projectDb");
const { executeQuery } = require("../databases/queryExecution");

async function isValidAccessToken(res, accessToken, decryptedBody) {
    const query = `
    SELECT 
      u.user_id, 
      u.email,
      do.otp,
      ud.user_device_id, 
      ud.device_token, 
      ud.device_name
    FROM 
      users u
    INNER JOIN 
      user_devices ud 
      ON u.user_id = ud.user_id
    INNER JOIN 
      device_otp do
      ON ud.user_device_id = do.user_device_id
    WHERE 
      ud.device_token = ? 
      AND u.email = ? 
      AND ud.device_name = ?
    `;
    try {
        const connection = await projectDB();
        const result = await executeQuery(res, query, [accessToken, decryptedBody.email, decryptedBody.device_name], connection);
        if (result.length > 0) {
            return verifyOTP(res, result[0].otp, decryptedBody, 0);
        }
        throw new Error("Invalid access token or device name");
    } catch (error) {
        throw new Error(`Error validating access token: ${error.message}`);
    }
}

async function verifyOTP(res, OTP, decryptedBody, updatedFlag = 1) {
    const { email, device_name } = decryptedBody;
    let connection = await projectDB();

    
    const userQuery = `
        SELECT u.*, a.attachment_link as user_image 
        FROM users u  
        LEFT JOIN attachments a ON u.image_attachment_id = a.attachment_id
        WHERE u.email = ?`;
    const userResult = await executeQuery(res, userQuery, [email], connection);

    if (userResult.length === 0) {
        throw new Error("User not found with email " + email);
    }

    const userId = userResult[0].user_id;

    
    const otpQuery = `
        SELECT * 
        FROM device_otp do
        INNER JOIN user_devices ud ON do.user_device_id = ud.user_device_id
        WHERE ud.user_id = ? AND do.otp = ? AND ud.device_name = ?
    `;
    connection = await projectDB();
    const otpResult = await executeQuery(res, otpQuery, [userId, OTP, device_name], connection);
    if (otpResult.length === 0 && false) {
        throw new Error("Invalid OTP");
    }

    const deviceId =  1; 

    const userDeviceDataQuery = `
        SELECT ud.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_device = await executeQuery(res, userDeviceDataQuery, [userId], connection);


    
    const userDeviceNotificationDataQuery = `
        SELECT n.*
        FROM users u 
        INNER JOIN user_devices ud ON u.user_id = ud.user_id
        INNER JOIN user_device_notifications udn ON ud.user_device_id = udn.user_device_id 
        INNER JOIN notifications n ON udn.notification_id = n.notification_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_device_notification = await executeQuery(res, userDeviceNotificationDataQuery, [userId], connection);


    const userRoleDataQuery = `
        SELECT  r.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN roles r ON rdd.role_id = r.role_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    user_role = await executeQuery(res, userRoleDataQuery, [userId], connection)

    const userRolesDesignationsDepartmentDataQuery = `
        SELECT  urdd.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_roles_designations_department = await executeQuery(res, userRolesDesignationsDepartmentDataQuery, [userId], connection)


    const userPermissionDataQuery = `
        SELECT *
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_permission = await executeQuery(res, userPermissionDataQuery, [userId], connection)

    const collectiveUserPermissionDataQuery = `
        SELECT p.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN user_role_designation_permissions urdp ON urdd.user_role_designation_department_id = urdp.user_role_designation_department_id
        INNER JOIN permissions p ON urdp.permission_id = p.permission_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const collective_user_permission = await executeQuery(res, collectiveUserPermissionDataQuery, [userId], connection)

    const userDesignationDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN designations d ON rdd.designation_id = d.designation_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_designation = await executeQuery(res, userDesignationDataQuery, [userId], connection)

    const userDepartmentDataQuery= `
        SELECT  d.*
        FROM users u
        INNER JOIN user_roles_designations_department urdd ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd ON urdd.role_designation_department_id = rdd.role_designation_department_id
        INNER JOIN departments d ON rdd.department_id = d.department_id
        WHERE u.user_id = ?
    `;
    connection = await projectDB();
    const user_department = await executeQuery(res, userDepartmentDataQuery, [userId], connection)

    const compoundUserDataQuery = `
        SELECT 
            u.user_id,
            u.email,
            urdd.user_role_designation_department_id,
            r.role_name,
            d.designation_name,
            dept.department_name
        FROM users u
        INNER JOIN user_roles_designations_department urdd 
            ON u.user_id = urdd.user_id
        INNER JOIN roles_designations_department rdd 
            ON urdd.role_designation_department_id = rdd.role_designation_department_id
        LEFT JOIN roles r 
            ON rdd.role_id = r.role_id
        LEFT JOIN designations d 
            ON rdd.designation_id = d.designation_id
        LEFT JOIN departments dept 
            ON rdd.department_id = dept.department_id
        WHERE u.user_id = ?;
    `
    connection = projectDB()
    const compound_user = await executeQuery(res, compoundUserDataQuery, [userId], connection)
    
    const payload = await generatePayload(userId, deviceId, OTP);
    const token = await generateToken(res, payload, process.env.SECRET_KEY);

    
    if (updatedFlag) {
        const updateTokenQuery = `
        UPDATE user_devices 
        SET device_token = ? 
        WHERE user_id = ? AND user_device_id = ?
        `;
        connection = await projectDB();
        await executeQuery(res, updateTokenQuery, [token, userId, deviceId], connection);
    }
    const groupedPermissions = user_roles_designations_department.reduce((acc, urdd) => {
        const relevantPermissions = user_permission
            .filter((perm) => perm.user_role_designation_department_id === urdd.user_role_designation_department_id)
            .map((perm) => perm.permission_name);
    
        acc[urdd.user_role_designation_department_id] = relevantPermissions;
        return acc;
    }, {});
    

    
    const returnObject = {
        user_id: userResult[0]?.user_id,
        user: userResult[0],
        device_name: device_name,
        access_token: token,
        user_roles_designations_departments : compound_user,
        user_devices: user_device,
        user_devices_notifications : user_device_notification,
        user_roles: user_role,
        user_permissions :  groupedPermissions,
        collective_user_permissions: collective_user_permission,
        user_departments : user_department,
        user_designations : user_designation,
    };

    return returnObject;
}

async function otpVerif(req, res, decryptedBody) {
    try {
        const { step } = req.query;
        if (step == "2") {
            const { otp } = decryptedBody;
            return await verifyOTP(res, otp, decryptedBody);
        } else {
            try {
                const accessToken = req.headers['accesstoken'];
                if (accessToken && accessToken !== 'null') {
                    return await isValidAccessToken(res, accessToken, decryptedBody);
                }
                const { email, device_name } = decryptedBody;
                await OTPGeneration(res, email, device_name);
                return "OTP Sent Successfully";
            } catch (error) {
                const { email, device_name } = decryptedBody;
                await OTPGeneration(res, email, device_name);
                return "OTP Sent Successfully";
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = otpVerif;
