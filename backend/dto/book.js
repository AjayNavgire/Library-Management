const Joi = require("joi")

const addDTO = Joi.object({
    title: Joi.string().required().min(4).max(30),
    author: Joi.string().required().min(4).max(30),
    genres: Joi.string().required().min(4).max(30),
    stock: Joi.number().required(),
    publishedDate: Joi.date().required()
   
});

const updateDTO = Joi.object({
    title: Joi.string().optional(),
    author: Joi.string().optional(),
    genres: Joi.string().optional(),
    stock: Joi.number().optional(),
    publishedDate: Joi.date().optional()
});



module.exports = {
    addDTO,
    updateDTO,
};
