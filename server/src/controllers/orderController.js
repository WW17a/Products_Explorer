
import { createOrder } from "../services/orderService.js";

export const createOrderController = async (req, res, next) => {
    try {
        const order = await createOrder(
            req.user.userId,
            req.body.shippingAddress
        );

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

