import * as productService from "../services/productService.js";

export const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct({  ...req.body,image: req.file,});

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getProducts();

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        next(error);
    }
};