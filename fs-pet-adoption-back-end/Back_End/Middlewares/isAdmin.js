module.exports = (req, res, next) => {
    if (req.user.accessLevel === "admin") return next();
    throw new Error("You do not have admin permissions to achieve this action");
  };
  