const Joi = require("joi");

const registerUserValidation = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]{3,30}$"))
    .required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").default("user"),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9!@#$%^&*()_+]{3,30}$"))
    .required(),
});

const sendResetPasswordOtpValidation = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOtpValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().length(6).required(),
});

module.exports = {
  registerUserValidation,
  loginUserValidation,
  sendResetPasswordOtpValidation,
  verifyOtpValidation,
};
