import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import { uploadImage } from "./cloudinaryService.js";

export const createProduct = async ({title,description,category,price,image,}) => {
    if (!image) {
        throw new AppError("Product image is required", 400);
    }

    const uploadedImage = await uploadImage( image.buffer,`product-explorer/${category}`);

    const product = await Product.create({ title,description,category, price,image: uploadedImage,});

    return product;
};


export const getProducts = async () => {
    const products = await Product.find()
        .sort({ createdAt: -1 })
        .lean();

    return products;
};