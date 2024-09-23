const authCheck = require("../../Middlewares/auth");
const isAdmin = require("../../Middlewares/isAdmin");
const router = require("express").Router();
const adminController = require("../../Controllers/admin.controller")

router.use(authCheck, isAdmin);

router.param("userId", adminController.setUserToDelete);
router.get("/users", adminController.getAllUsers);
router.delete("/:userId", adminController.deleteUserbyId);

module.exports = router;
