import Joi from "joi";

export const createProductSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(150)
        .required(),

    description: Joi.string()
        .trim()
        .min(10)
        .max(2000)
        .required(),

    category: Joi.string()
        .trim()
        .lowercase()
        .required(),

    price: Joi.number()
        .min(0)
        .required(),
});