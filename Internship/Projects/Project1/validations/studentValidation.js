const Joi = require("joi");

exports.createStudentValidation = Joi.object({
    name:Joi.string().min(3).max(40).optional(),
    email:Joi.string().email().required(),
    phone:Joi.number()
})