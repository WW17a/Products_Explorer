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

    rating: Joi.number()
        .min(0)
        .max(5)
        .required(),

    stock: Joi.number()
        .integer()
        .min(0)
        .required(),
});

export const updateProductSchema = Joi.object({
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

    rating: Joi.number()
        .min(0)
        .max(5)
        .required(),

    stock: Joi.number()
        .integer()
        .min(0)
        .required(),
}); 