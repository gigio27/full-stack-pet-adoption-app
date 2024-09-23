const Pet = require("../Models/Pet");
const FormError = require("../Errors/FormError");
const userService = require("../Services/user.service")
const petService = require("../Services/pet.service")

const findAndSetPet = async (req, res, next, petId) => {
    const pet = await petService.findPetbyId(petId);

    req.pet = pet;
    next();
};

const fillPet = (req, res) => {
    res.json(req.pet);
}

const getAllPets = async (req, res) => {
    const allPets = await petService.getAllPets();
    res.json(allPets);  
}

const changePetStatus = async (req, res) => {
    switch (req.body.status) {
        case "fostered":
            await req.user.fosterPet(req.pet._id);
            break;
        case "adopted":
            await req.user.adoptPet(req.pet._id);
            break;
        case "available":
            await req.user.returnPet(req.pet._id);
            break;
        default:
            throw new FormError("Invalid status");
    }
    res.json({ status: "success", message: `Pet status changed with sucess to ${req.body.status}` });

}

const searchPets = async (req, res, next) => {
    const query = {};
    req.body.forEach((line) => {
        switch (line.operator) {
            case "equal":
                return (query[line.field] = { $eq: line.value });
            case "not-equal":
                return (query[line.field] = { $ne: line.value });
            case "contain":
                return (query[line.field] = { $regex: line.value, $options: "i" });
            case "more":
                return (query[line.field] = { $gt: line.value });
            case "less":
                return (query[line.field] = { $lt: line.value });
            default:
                throw new Error("Invalid operator");
        }
    })

    const final = await Pet.find(query)
    .collation({ locale: "he", strength: 2 })
    .sort({ createdAt: "desc"});

    if (final.length > 0) return res.json(final);
    return next(new FormError("No pets found, please try again"));
}

const addPet = async (req, res) => {
    const pet = await petService.addPet(req.body);
    res.json(pet);
}

const deletePet = async (req, res) => {
    await petService.deletePetbyId(req.pet._id);
    await userService.removeThisPetfromAllUsers(req.pet._id);
    res.json({ status: "success", message: "Pet deleted with sucess" });
}

const updatePet = async (req, res) => {
    Object.assign(req.pet, req.body);
    await req.pet.save();
    res.json({ status: "success", message: "Pet updated with sucess" });
};

module.exports = {
    findAndSetPet,
    fillPet,
    getAllPets,
    changePetStatus,
    searchPets,
    addPet,
    deletePet,
    updatePet,
};