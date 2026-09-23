import Joi from "joi";

export const signupSchema = Joi.object({
    username: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .required(),

    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .max(128)
        .required(),
});

export const signinSchema = Joi.object({
    email: Joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: Joi.string()
        .required(),
});