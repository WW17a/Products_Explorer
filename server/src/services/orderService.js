import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import AppError from "../utils/AppError.js";

const SHIPPING_COST = 10;

export const createOrder = async (userId, shippingAddress) => {
    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
        throw new AppError("Cart is empty", 400);
    }

    const productIds = cart.items.map((item) => item.product);

    const products = await Product.find({ _id: { $in: productIds } }).select(
        "title price stock"
    );

    const productMap = new Map(
        products.map((product) => [product._id.toString(), product])
    );

   
    const orderItems = await Promise.all(
        cart.items.map(async (cartItem) => {
            const product = productMap.get(cartItem.product.toString());

            if (!product) {
                throw new AppError(
                    "One or more products in your cart are no longer available",
                    409
                );
            }

            if (cartItem.quantity > product.stock) {
                throw new AppError(
                    `${product.title} does not have enough stock`,
                    409
                );
            }

            return {
                product: product._id,
                title: product.title,
                price: product.price,
                quantity: cartItem.quantity,
            };
        })
    );

    const subtotal = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const totalAmount = subtotal + SHIPPING_COST;

    const order = await Order.create({
        user: userId,
        items: orderItems,
        shippingAddress,
        subtotal,
        shipping: SHIPPING_COST,
        totalAmount,
        status: "pending",
        paymentStatus: "pending",
    });

    return order;
};