const generateCookie = (res, token) => {
    var oneYear = 7 * 24 * 3600 * 1000 * 52;
  
    res.cookie("JWT", JSON.stringify(token), {
      secure: false,
      httpOnly: true,
      expires: new Date(Date.now() + oneYear),
    });
  };
  
  module.exports = generateCookie;