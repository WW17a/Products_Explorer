import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";
import { deleteImage, uploadImage } from "./cloudinaryService.js";

export const createProduct = async ({title,description,category,price,rating ,stock,image,}) => {
    if (!image) {
        throw new AppError("Product image is required", 400);
    }

    const uploadedImage = await uploadImage( image.buffer,`product-explorer/${category}`);

    const product = await Product.create({ title,description,category, price,rating,stock,image: uploadedImage,});

    return product;
};

export const getProducts = async ({ search = "", category = "", sortBy = "", order = "asc", page = 1, limit = 8 }) => {
    const query = {};
    
    if (search) query.title = { $regex: search, $options: "i" };

    if (category) query.category = category.toLowerCase();

    const sort = {};
    if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;


    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.min(Math.max(Number(limit) || 8, 1), 50);
    const skip = (pageNumber - 1) * limitNumber;

    const [products, totalProducts] = await Promise.all([
        Product.find(query).sort(sort).skip(skip).limit(limitNumber),
        Product.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalProducts / limitNumber);

    return {
        products,
        pagination: { currentPage: pageNumber, totalPages, totalProducts, limit: limitNumber },
    };
};

export const updateProduct = async (
    productId,
    { title, description, category, price, rating, stock, image }
) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    product.title = title;
    product.description = description;
    product.category = category;
    product.price = price;
    product.rating = rating;
    product.stock = stock;

    if (image) {
        const uploadedImage = await uploadImage(  image.buffer,`product-explorer/${category}`);
        product.image = uploadedImage;
    }
    await product.save();
    return product;
};


export const deleteProduct = async (productId) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    await deleteImage(product.image.publicId)

    await Product.findByIdAndDelete(productId);

    return product;
};