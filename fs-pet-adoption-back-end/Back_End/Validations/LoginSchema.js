const Yup = require("yup");

const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is Required"),

  password: Yup.string().required("Password is required").min(6, "Passwords should have a minimum 6 characters"),
});

module.exports = LoginSchema;
