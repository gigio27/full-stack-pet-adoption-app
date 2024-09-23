const User = require("../Models/User");
const cookieSettings = require("../Config/cookie");


const generateJWT = require("../utils/generateJWT");

const FormError = require("../Errors/FormError");

const userService = require("../Services/user.service");

const login = async (req, res, next) => {
  res.clearCookie("JWT");
  const found = await userService.findUserByEmail(req.body.email);
  if (!found) {
    return next(new FormError("Email not found"));
  }
  const isPasswordOk = userService.comparePassword(
    req.body.password,
    found.password
  );
  if (!isPasswordOk) {
    return next(new FormError("Incorrect Password"));
  }
  const token = await generateJWT(found._id);
  console.log(token, '..........', 'token from signup')

  res.cookie("JWT", token, cookieSettings);
  res.json({ status: "success", message: "Logged in", token });
};

const logout = (req, res) => {
  res.clearCookie("JWT");
  res.json({ status: "success", message: "Logged out" });
};

const isLoggedIn = (req, res) => {
  res.json(req.user.toProfileJSON());
};

const signup = async (req, res, next) => {
  res.clearCookie("JWT");
  const newuser = { ...req.body };
  delete newuser.repassword;
  const hashed = userService.hashPassword(req.body.password);
  const user = new User({
    ...newuser,
    password: hashed,
  });
  try {
    await user.save();
    const token = await generateJWT(user._id);
    res.cookie("JWT", token, cookieSettings);
    res.json(user);
  } catch (e) {
    console.log("error,", e);
    next(
      new FormError(
        "This email is already in use. Please create an account with a new email, or login with your existing account."
      )
    );
  }
};

const updateUser = async (req, res, next) => {
  if (req.body.bio) {
    req.user.bio = req.body.bio;
  }
  if (req.body.firstName) {
    req.user.firstName = req.body.firstName;
  }
  if (req.body.lastName) {
    req.user.lastName = req.body.lastName;
  }
  if (req.body.phone) {
    req.user.phone = req.body.phone;
  }

  if (req.body.email) {
    if (req.body.email !== req.user.email) {
      const found = await userService.findUserByEmail(req.body.email);
      if (found) {
        return next(
          new FormError(
            "This Email is already associated with another account. Please try with another email"
          )
        );
      } else {
        req.user.email = req.body.email;
      }
    } else {
      req.user.email = req.body.email;
    }
  }

  if (req.body.savedPets) {
    req.user.savedPets = req.body.savedPets;
  }
  if (req.body.newpassword) {
    if (req.body.newpassword === req.body.confirmnewpassword) {
      const hashed = userService.hashPassword(req.body.newpassword) 
      req.user.password = hashed;
    } else {
      return next(new FormError("Passwords do not match"));
    }
  }
  await userService.saveUser(req.user);
  res.json({ status: "success", message: "user updated" });
};



module.exports = {
  logout,
  isLoggedIn,
  signup,
  login,
  updateUser,
};
