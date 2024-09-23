const express = require("express");
const router = express.Router();

const userController = require("../../Controllers/user.controller");

const validateForm = require("../../Middlewares/validateForm");
const SignupSchema = require("../../Validations/SignUpSchema");
const LoginSchema = require("../../Validations/LoginSchema");
const authCheck = require("../../Middlewares/auth");

router.get("/isloggedin", authCheck, userController.isLoggedIn);
router.get("/logout", authCheck, userController.logout);
router.post("/signup", validateForm(SignupSchema), userController.signup)
router.post("/login", validateForm(LoginSchema), userController.login);
router.put("/", authCheck, userController.updateUser);


module.exports = router;