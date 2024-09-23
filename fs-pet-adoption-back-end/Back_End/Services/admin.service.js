const User = require("../Models/User");


const getAllUsersAndTheirPets = async () => { 
    const users = await User.find({}).populate(
        "adoptedPets fosteredPets savedPets",
        "name image type status"
      );
      return users;      
}

const findUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

const findUserByIdAndDelete = async (id) => { 
    const user = await User.findByIdAndDelete(id);

    return user;
}

module.exports = {
    getAllUsersAndTheirPets,
    findUserById,
    findUserByIdAndDelete,
  };
  