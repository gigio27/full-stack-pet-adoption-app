const FormError = require("../Errors/FormError");

const validateForm = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      next(new FormError(error.message));
    }
  };
};

module.exports = validateForm;