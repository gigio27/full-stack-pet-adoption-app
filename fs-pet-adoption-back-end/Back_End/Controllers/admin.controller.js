const adminService = require("../Services/admin.service")

const getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsersAndTheirPets();
    res.json(users);
};

const setUserToDelete = async (req, res, next, userId) => {
    const user = await adminService.findUserById(userId);
    req.userToDel = user;
    next();
}

const deleteUserbyId = async (req, res) => {
    await adminService.findUserByIdAndDelete(req.userToDel._id);
    res.json({ status: "success", message: "User deleted with sucess" });
}

module.exports = {
    getAllUsers,
    setUserToDelete,
    deleteUserbyId,
  };
  