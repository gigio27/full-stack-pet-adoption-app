class FormError extends Error {
    constructor(props) {
      super(props);
      this.status = 400;
      this.type = "FormError"
    }
  }
  
  module.exports = FormError;
  