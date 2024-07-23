const Joi = require("joi");

const addDTO = Joi.object({
  book_info: Joi.object({
    id: Joi.string()
      .required()
      .pattern(/^[0-9a-fA-F]{24}$/) // Pattern to validate MongoDB ObjectId format
      .message("Invalid ObjectId format"),
    title: Joi.string().required().min(4).max(30),
    author: Joi.string().required().min(4).max(30),
    genre: Joi.string().required().min(4).max(30),
    stock: Joi.number().required().min(0),
  }).required(),
});

const updateDTO = Joi.object({
  book_info: Joi.object({
    id: Joi.string()
      .optional()
      .pattern(/^[0-9a-fA-F]{24}$/) // Optional, in case you want to allow ID updates
      .message("Invalid ObjectId format"),
    title: Joi.string().optional().min(4).max(30),
    author: Joi.string().optional().min(4).max(30),
    genre: Joi.string().optional().min(4).max(30),
    stock: Joi.number().optional().min(0),
  }).optional(),
});


module.exports = {
    addDTO,
    updateDTO,
};
