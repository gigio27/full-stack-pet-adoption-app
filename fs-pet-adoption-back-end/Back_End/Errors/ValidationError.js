class ValidationError extends Error {
    constructor(props) {
      super(props);
      this.status = 400;
      this.type = "ValidationError"
    }
  }
  
  module.exports = ValidationError;
  