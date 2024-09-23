class AuthError extends Error {
    constructor(props) {
      super(props);
      this.status = 401;
      this.type = "AuthError";
    }
  }
  
  module.exports = AuthError;
  