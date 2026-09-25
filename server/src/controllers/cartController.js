import * as cartService from "../services/cartService.js";


export const addToCart = async (req, res, next) => {
    try {
        const { productId , quantity } = req.body;

        const cart = await cartService.addToCart(
            req.user.userId,
            productId,
            quantity
        );

        res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};


export const getCart = async (req, res, next) => {
    try {
        const cart = await cartService.getCart(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            cart,
        });
    } catch (error) {
        next(error);
    }
};


export const updateCartItem = async (req, res, next) => {
    try {
        const { id : productId } = req.params;
        const { quantity } = req.body;

        const cart = await cartService.updateCartItem(
            req.user.userId,
            productId,
            quantity
        );

        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};


export const removeFromCart = async (req, res, next) => {
    try {
        const { id : productId } = req.params;

        const cart = await cartService.removeFromCart(
            req.user.userId,
            productId
        );

        res.status(200).json({
            success: true,
            message: "Product removed from cart successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};


export const clearCart = async (req, res, next) => {
    try {
        const cart = await cartService.clearCart(
            req.user.userId
        );

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart,
        });
    } catch (error) {
        next(error);
    }
};