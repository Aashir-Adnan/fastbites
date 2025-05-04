const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req) => {
    // const resource = req.params.resource;
    // const method = req.method.toLowerCase(); 
    // if (method === "post" && (resource === "users" || resource === "login")){
    //     next();
    //     return;
    // }

    // const token = req.headers["authorization"];
    // console.log(token);
    // if (!token) {
    //     throw new Error('Access Denied: No Token Provided');
    // }

    // try {
    //     const decoded = jwt.verify(token, JWT_SECRET);
    //     const { UID, roles } = decoded; 
    //     const { Auth_URID } = req.body;
    //     if (!Auth_URID) {
    //         throw new Error('Auth_URID is required');
    //     }
    //     console.log("UID: " + UID);
    //     console.log("Roles: " + roles);
    //     const userRole = await UserRoles.findOne({
    //         where: {
    //             UID: UID,
    //             RoleID: roles
    //         }
    //     });
    //     console.log("URID FROM QUERY: " + userRole.URID);
    //     if (!userRole) {
    //         throw new Error('Access Denied: Insufficient permissions');
    //     }

    //     if (userRole.URID != Auth_URID) {
    //         throw new Error('Access Denied: Invalid Auth_URID');
    //     }

    // } catch (error) {
    //     throw new Error('Invalid Token ' + error.message);
    // }
};

module.exports = authMiddleware;
