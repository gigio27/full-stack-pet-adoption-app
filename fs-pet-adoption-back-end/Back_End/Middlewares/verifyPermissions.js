const permissions = require("../Config/permissions");
const AccessError = require("../Errors/AccessError");

module.exports = (action) => {
    return (req, res, next) => {
    const allowedRoles = permissions[action];
    if (allowedRoles.includes(req.user.accessLevel)) return next();
    next(new AccessError())
    }
}