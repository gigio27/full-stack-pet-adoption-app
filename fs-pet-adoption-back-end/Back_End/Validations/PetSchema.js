const Yup = require("yup");

const PetSchema = Yup.object({
type: Yup.string().required("Type is required"),
name: Yup.string().required("Name is required"),
status: Yup.string().required("Status is required"),
height: Yup.number().required("Height is required"),
weight: Yup.number().required("Weight is required"),
color: Yup.string().required("Color is required"),
bio: Yup.string(),
hypoallergenic: Yup.string(),
dietaryRestrictions: Yup.array().min(1).of(Yup.string().required()).required("Dietary Restrictions is required"),
breed: Yup.string().required("Breed is required"),


})

module.exports = PetSchema;