const Joi = require("joi")

const userRegisterDTO = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
   
});

const userUpdateDTO = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().optional(),
});

const emailLoginDTO = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});


module.exports = {
    userRegisterDTO,
    userUpdateDTO,
    emailLoginDTO,
};
