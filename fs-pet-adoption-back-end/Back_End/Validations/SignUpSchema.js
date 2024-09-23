const Yup = require("yup");

const SignupSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is Required"),
  phone: Yup.number().required("Phone number is required"),
  password: Yup.string().required("Password is required").min(6, "Passwords should have a minimum 6 characters"),
});

module.exports = SignupSchema;
