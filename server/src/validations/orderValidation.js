import Joi from "joi";

export const createOrderSchema = Joi.object({
    shippingAddress: Joi.object({
        fullName: Joi.string().trim().min(2).max(100).required(),
        phone: Joi.string().trim().pattern(/^[0-9]{11}$/).required(),
        address: Joi.string().trim().min(5).max(200).required(),
        city: Joi.string().trim().min(2).max(50).required(),
        postalCode: Joi.string().trim().pattern(/^[0-9]{5}$/).required(),
    }).required(),
}).required();

