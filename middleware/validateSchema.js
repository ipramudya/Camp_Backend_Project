const Joi = require('joi');
const ErrorResponse = require('../utils/ErrorResponse');

const validateCampground = function (req, res, next) {
  const JoiSchema = Joi.object({
    campground: Joi.object({
      title: Joi.string().required(),
      price: Joi.number().required().min(0),
      image: Joi.string().required(),
      location: Joi.string().required(),
      description: Joi.string().required(),
    }).required(),
  });
  const { error } = JoiSchema.validate(req.body);
  if (error) {
    const joiMessage = error.details.map((e) => e.message).join(',');
    throw new ErrorResponse(joiMessage, 400);
  } else {
    next();
  }
};

module.exports = validateCampground;
