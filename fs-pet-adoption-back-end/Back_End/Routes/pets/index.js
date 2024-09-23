const express = require("express")
const authCheck = require("../../Middlewares/auth");
const validateForm = require("../../Middlewares/validateForm");
const verifyPermissions = require("../../Middlewares/verifyPermissions");
const router = express.Router();
const petController = require("../../Controllers/pets.controller");
const PetSchema = require("../../Validations/PetSchema");
const isAdmin = require("../../Middlewares/isAdmin");

router.param("petId", petController.findAndSetPet);

router.get("/", petController.getAllPets);
router.delete(`/:petId`, authCheck, petController.deletePet);
router.post("/search", petController.searchPets);
router.post("/", authCheck, verifyPermissions("CREATE_PET"), validateForm(PetSchema), petController.addPet)
router.get("/:petId", petController.fillPet);
router.post("/:petId/status", authCheck, petController.changePetStatus);
router.put("/:petId", authCheck, isAdmin, validateForm(PetSchema), petController.updatePet);



module.exports = router;