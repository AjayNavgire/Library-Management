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
  }).required(),
  user_id : Joi.object().required()
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
  }).optional(),
  user_id : Joi.object().optional()
});

const renewDTO = Joi.object({
  book_info: Joi.object({
    isRenewed: Joi.boolean().required()
  })
})

const returnDTO = Joi.object({
  book_info: Joi.object({
    isReturned: Joi.boolean().required()
  })
})


module.exports = {
    addDTO,
    updateDTO,
    renewDTO,
    returnDTO
};
