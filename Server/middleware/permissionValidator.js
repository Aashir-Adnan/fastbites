const projectDB = require("../Database/projectDb");
const { executeQuery } = require("../Database/queryExecution");

const checkUserPermission = async (URID, RequiredPermissions) => {
    if (!URID) {
        throw new Error('URID is required');
    }

    if (!Array.isArray(RequiredPermissions) || RequiredPermissions.length === 0) {
        throw new Error('RequiredPermissions must be a non-empty array');
    }

    const formattedPermissions = `(${RequiredPermissions
        .map(permission => `'${permission}'`)
        .join(', ')})`;

    const query = `
        SELECT COUNT(*) as permissionCount
        FROM userRoles AS ur
        JOIN rolesPermissions AS rp ON ur.RoleID = rp.RoleID
        JOIN permissions AS p ON rp.PermissionID = p.PermissionID
        WHERE ur.URID = ?
        AND p.PermissionDesc IN ${formattedPermissions}
    `;

    try {
        const values = [URID];
        const connection = projectDB();
        const result = await executeQuery(query, values, connection);

        if (result[0].permissionCount < RequiredPermissions.length) {
            throw new Error('User does not have the required permissions');
        }
    } catch (error) {
        throw new Error('An error occurred while checking permissions: ' + error.message);
    }
};

module.exports = checkUserPermission;
