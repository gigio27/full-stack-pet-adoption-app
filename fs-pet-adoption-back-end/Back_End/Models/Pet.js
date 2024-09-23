const mongoose = require("mongoose");

const petSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["dog", "cat", "bird"] },
    name: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ["adopted", "fostered", "available"],
      default: "available",
    },
    height: { type: Number },
    weight: { type: Number },
    color: { type: String },
    bio: { type: String, default: "No bio available" },
    hypoallergenic: { type: Boolean },
    dietaryRestrictions: { type: Array },
    breed: { type: String },
    image: {
      type: String,
    },
  },
  {
  
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
