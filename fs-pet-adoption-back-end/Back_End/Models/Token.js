const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    token: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
