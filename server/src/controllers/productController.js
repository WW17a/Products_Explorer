import * as productService from "../services/productService.js";

export const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct({ ...req.body, image: req.file, });

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
        const { search, category, sortBy, order, page, limit, } = req.query;

        const result = await productService.getProducts({ search, category, sortBy, order, page, limit, });

        res.status(200).json({
            success: true,
            products: result.products,
            pagination: result.pagination,
        });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            {
                ...req.body,
                image: req.file,
            }
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.deleteProduct(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            product,
        });
    } catch (error) {
        next(error);
    }
};