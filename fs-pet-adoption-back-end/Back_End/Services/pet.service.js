const Pet = require("../Models/Pet");

const findPetbyId = async (id) => {
    const pet = await Pet.findById(id);
    return pet;
}

const deletePetbyId = async (id) => {
    await Pet.findByIdAndDelete(id);

}

const getAllPets = async () => {
    const allPets = await Pet.find({}).sort({ createdAt : "desc"})
    return allPets;
}

const addPet = async (payload) => {
    const pet = new Pet({
        type: payload.type,
        name: payload.name,
        status: payload.status,
        height: payload.height,
        weight: payload.weight,
        color: payload.color,
        bio: payload.bio,
        hypoallergenic: payload.hypoallergenic,
        dietaryRestrictions: payload.dietaryRestrictions,
        breed: payload.breed,
        image: payload.image,
    })
    await pet.save();
    return pet;
}

module.exports = {
    findPetbyId,
    deletePetbyId,
    getAllPets,
    addPet,
    };