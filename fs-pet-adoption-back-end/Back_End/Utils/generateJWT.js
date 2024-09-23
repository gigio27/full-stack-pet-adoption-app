const jwt = require("jsonwebtoken");

const config = require("../Config");

const Token = require("../Models/Token");

const generateJWT = async (userId) => {
  const expireInOneYear = Date.now() + 1000 * 60 * 60 * 24 * 365;
  const token = jwt.sign(
    {
      id: userId,
      exp: expireInOneYear,
    },
    config.SECRET
  );
  const newToken = new Token({ id: userId, token });
  await newToken.save();
  return token;
};

module.exports = generateJWT;
