const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const {SendResponse, getRecordsByField, updateRecordsByField, ConsoleLog} = require('../data/utils');
const {Users, UserRoles, Roles, UserRolesDepartments} = require('../models');

function isTokenExpired(token) {
    const expiryTime = decodeToken(token).exp; 
    const currentTime = Math.floor(Date.now() / 1000); 
    return expiryTime < currentTime;
}

function tokenGen (payload){
    const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return accessToken;
}

function generateRefreshToken(user) {
    return jwt.sign({ userId: user.UID }, JWT_SECRET, { expiresIn: '1d' });
}

const loginInfo = async (Username, Password)=>{
    const conditions = [
        {
            field: 'Username',
            operator: '=',
            value: Username
        },
        {   
            field: 'PasswordHash',
            operator: '=',
            value: Password
        }
    ];

    const userDetails = await getRecordsByField(Users, conditions);

    if (!userDetails || userDetails.length === 0) {
        throw new Error('User Not Found');
    }

    const userId = userDetails[0].UID;

    const userRoles = await getRecordsByField(UserRoles, [{ field: 'UID', operator: '=', value: userId }]);

    const roleIds = userRoles.map(role => role.RoleID);
    ConsoleLog("roleIds: " + roleIds);
    const roleDescriptions = await getRecordsByField(Roles, [{ field: 'RoleID', operator: 'IN', value: roleIds }]);

    const userRoleDepartmentIds = userRoles.map(role => role.URID);
    const userRolesDepartments = await getRecordsByField(UserRolesDepartments, [{ field: 'URID', operator: 'IN', value: userRoleDepartmentIds }]);

    const tokenPayload = {
        UID: userId,
        roles: roleIds
    };
    const accessToken = tokenGen(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    const updateFields = {"RefreshToken" : refreshToken};
    updateRecordsByField(Users, conditions, updateFields);
    const response = {
        accessToken, 
        refreshToken,
        userDetails: userDetails[0],
        userRoles: userRoles,
        roleDescriptions: roleDescriptions,
        userRolesDepartments: userRolesDepartments
    };
    return response;
}

module.exports = {
    isTokenExpired,
    loginInfo,
    tokenGen,   
    generateRefreshToken
}