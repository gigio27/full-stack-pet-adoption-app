class AccessError extends Error {
    constructor(props) {
      super(props);
      this.status = 400;
      this.message = "You do not have permission to perform this action";
      this.type = "AccessError";
    }
  }
  
  module.exports = AccessError;
  