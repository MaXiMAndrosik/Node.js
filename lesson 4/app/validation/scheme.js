const joi = require("joi");

const userSchema = joi.object({
    firstName: joi.string().min(2).required(),
    secondName: joi.string().min(2).required(),
    age: joi.number().min(6).max(150).required(),
    city: joi.string().min(2).required(),
});

const idScheme = joi.object({
    id: joi.number().required(),
});

module.exports = { userSchema, idScheme };