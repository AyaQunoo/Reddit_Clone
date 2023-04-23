const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  details: Joi.string().min(3).max(1000),
  image_url: Joi.string(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(20),
  details: Joi.string().min(3).max(1000),
  image_url: Joi.string(),
});
module.exports = { postSchema, updatePostSchema };
