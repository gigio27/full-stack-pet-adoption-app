const jwt = require("jsonwebtoken");
const config = require("../Config");
const AuthError = require("../Errors/AuthError");
const User = require("../Models/User");


const authCheck = (req, res, next) => {
  if (req.cookies.JWT) {
    return jwt.verify(req.cookies.JWT, config.SECRET, async (err, decoded) => {
      if (err) return next(new AuthError("Invalid JWT"));
      const thisUser = await User.findById(decoded.id);
      if (!thisUser)
        return next(new AuthError("No user exists with this token"));
      req.user = thisUser;
      return next();
    });
  }
  next(new AuthError("No JWT was found"));
};

module.exports = authCheck;
