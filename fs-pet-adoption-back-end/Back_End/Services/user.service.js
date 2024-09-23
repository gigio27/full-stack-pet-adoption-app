const User = require("../Models/User");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

const findUserByEmail = async (thisEmail) => {
  const found = await User.findOne({ email: thisEmail });
  return found;
};

const saveUser = async (user) => {
  user.save();
};

const comparePassword = (loginPassword, storedPassword) =>
  bcrypt.compareSync(loginPassword, storedPassword);

const hashPassword = (newPassword) => {
  return bcrypt.hashSync(newPassword, SALT_ROUNDS);
};

const removeThisPetfromAllUsers = async (petId) => {
  await User.updateMany({}, { $pull: { savedPets: { $in: [petId] } } });
  await User.updateMany({}, { $pull: { adoptedPets: { $in: [petId] } } });
  await User.updateMany({}, { $pull: { fosteredPets: { $in: [petId] } } });
  console.log(`removed from all users ${petId}`);
};

module.exports = {
  findUserByEmail,
  saveUser,
  comparePassword,
  hashPassword,
  removeThisPetfromAllUsers,
};
