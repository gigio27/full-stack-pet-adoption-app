const mongoose = require("mongoose");
const Pet = require("./Pet");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    accessLevel: { type: String, default: "user" },
    bio: { type: String, default: "Tell us about yourself" },
    savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    fosteredPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toProfileJSON = function () {
  return {
    email: this.email,
    phone: this.phone,
    firstName: this.firstName,
    lastName: this.lastName,
    accessLevel: this.accessLevel,
    bio: this.bio,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    savedPets: this.savedPets,
    fosteredPets: this.fosteredPets,
    adoptedPets: this.adoptedPets,
  };
};

//foster pet: add pet id to user's Fostered PETS & change pet status to 'fostered'

userSchema.methods.fosterPet = async function (petId) {
  this.fosteredPets.push(petId);
  await Pet.findOneAndUpdate({ _id: petId}, {status: "fostered"});
  await this.save();
}

//adopt pet: add pet id to user's adopted PETS, if in Fostered PETS then remove, & change pet status to 'adopted'

userSchema.methods.adoptPet = async function (petId) {
  if(this.fosteredPets.includes(petId)) {
    this.fosteredPets = this.fosteredPets.filter((pID) => pID.toString() !== petId.toString());
  };
  this.adoptedPets.push(petId);
  await Pet.findOneAndUpdate({ _id: petId}, {status: "adopted"});
  await this.save();
};

//return pet: remove from user's fostered PETS or Adopted PETS if it's there & change pet status to 'available'
userSchema.methods.returnPet = async function (petId) {
  const petInArray = (() => {
    if(this.fosteredPets.includes(petId)) {
      return "fosteredPets";
    } else if (this.adoptedPets.includes(petId)) {
      return "adoptedPets";

    }
    throw new Error("Pet not found in user's pets");
  })()

  this[petInArray] = this[petInArray].filter((pID) => pID.toString() !== petId.toString());

  await Pet.findOneAndUpdate({ _id: petId}, {status: "available"});
  await this.save();
}


const User = mongoose.model("User", userSchema);

module.exports = User;
