import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import AppError from "../utils/AppError.js";



export const addToCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError("Quantity must be at least 1", 400);
    }

    if (quantity > product.stock) {
        throw new AppError(
            `Only ${product.stock} items are available`,
            400
        );
    }

    let cart = await Cart.findOne({ user: userId, });

    if (!cart) {
        cart = await Cart.create({
            user: userId,
            items: [
                {
                    product: productId,
                    quantity,
                },
            ],
        });

        return await cart.populate("items.product");
    }

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;

        if (newQuantity > product.stock) {
            throw new AppError(
                `Only ${product.stock} items are available`,
                400
            );
        }

        existingItem.quantity = newQuantity;
    } else {
        cart.items.push({
            product: productId,
            quantity,
        });
    }

    await cart.save();

    return await cart.populate("items.product");
};


export const getCart = async (userId) => {
    const cart = await Cart.findOne({user: userId}).populate("items.product");

    if (!cart) {
        return {
            user: userId,
            items: [],
        };
    }

    return cart;
};


export const updateCartItem = async (userId, productId, quantity) => {

    if (!Number.isInteger(quantity) || quantity < 1) {
        throw new AppError("Quantity must be at least 1", 400);
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    if (quantity > product.stock) {
        throw new AppError(
            `Only ${product.stock} items are available`,
            400
        );
    }

    const cart = await Cart.findOne({
        user: userId,
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const item = cart.items.find(
        (item) => item.product.toString() === productId
    );

    if (!item) { throw new AppError("Product is not in the cart", 404) }

    item.quantity = quantity;

    await cart.save();

    return await cart.populate("items.product");
};


export const removeFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({
        user: userId,
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    const itemExists = cart.items.some(
        (item) => item.product.toString() === productId
    );

    if (!itemExists) {
        throw new AppError("Product is not in the cart", 404);
    }

    cart.items = cart.items.filter(
        (item) => item.product.toString() !== productId
    );

    await cart.save();

    return await cart.populate("items.product");
};


export const clearCart = async (userId) => {
    const cart = await Cart.findOne({
        user: userId,
    });

    if (!cart) {
        throw new AppError("Cart not found", 404);
    }

    cart.items = [];

    await cart.save();

    return cart;
};