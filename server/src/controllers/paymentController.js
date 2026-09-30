import mongoose from "mongoose";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Cart from '../models/Cart.js'
import { createPayPalOrder , capturePayPalOrder,} from "../services/paypalService.js";
import AppError from "../utils/AppError.js";

export const createPaymentController = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            throw new AppError("Invalid order ID", 400);
        }

        const order = await Order.findOne({
            _id: orderId,
            user: userId,
        });

        if (!order) {
            throw new AppError("Order not found", 404);
        }

        if (order.paymentStatus === "paid") {
            throw new AppError("Order is already paid", 409);
        }

        if (order.status === "cancelled") {
            throw new AppError("Cancelled order cannot be paid", 409);
        }

        let payment = await Payment.findOne({ order: order._id });

        if (payment?.providerOrderId) {
            return res.status(200).json({
                success: true,
                message: "Payment already initialized",
                payment: {
                    id: payment._id,
                    providerOrderId: payment.providerOrderId,
                    approveUrl: payment.approveUrl,
                    amount: payment.amount,
                    currency: payment.currency,
                    status: payment.status,
                },
            });
        }

        if (!payment) {
            payment = await Payment.create({
                order: order._id,
                user: userId,
                provider: "paypal",
                amount: order.totalAmount,
                currency: order.currency,
                status: "pending",
            });
        }

        const paypalOrder = await createPayPalOrder({
            amount: order.totalAmount,
            currency: order.currency,
            requestId: `create-${payment._id}`,
        });

        const approveUrl = paypalOrder.links?.find((link) => link.rel === "approve")?.href;
        if (!approveUrl) {
            throw new AppError("PayPal approval URL was not returned", 502);
        }

        payment.providerOrderId = paypalOrder.id;
        payment.approveUrl = approveUrl;
        payment.status = "processing";

        await payment.save();

        res.status(201).json({
            success: true,
            message: "PayPal payment created",
            payment: {
                id: payment._id,
                providerOrderId: payment.providerOrderId,
                approveUrl: payment.approveUrl,
                amount: payment.amount,
                currency: payment.currency,
                status: payment.status,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const capturePaymentController = async (req, res, next) => {
    try {
        const { paymentId } = req.params;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(paymentId)) {
            throw new AppError("Invalid payment ID", 400);
        }

        const payment = await Payment.findOne({
            _id: paymentId,
            user: userId,
        });

        if (!payment) {
            throw new AppError("Payment not found", 404);
        }

        if (payment.status === "paid") {
            throw new AppError("Payment is already completed", 409);
        }

        if (!payment.providerOrderId) {
            throw new AppError("PayPal order has not been created", 400);
        }

        const captureResult = await capturePayPalOrder({
            paypalOrderId: payment.providerOrderId,
            requestId: `capture-${payment._id}`,
        });

        if (captureResult.status !== "COMPLETED") {
            payment.status = "unknown";
            await payment.save();

            throw new AppError(
                "Payment status could not be confirmed",
                502
            );
        }

        payment.status = "paid";
        payment.providerPaymentId = captureResult.purchase_units?.[0]?.payments?.captures?.[0]?.id;

        await payment.save();

        await Order.findByIdAndUpdate(payment.order, {
            paymentStatus: "paid",
        });


        await Cart.findOneAndUpdate(
            { user: payment.user },
            { $set: { items: [] } }
        );


        res.status(200).json({
            success: true,
            message: "Payment captured successfully",
            payment: {
                id: payment._id,
                providerOrderId: payment.providerOrderId,
                providerPaymentId: payment.providerPaymentId,
                amount: payment.amount,
                currency: payment.currency,
                status: payment.status,
            },
        });
    } catch (error) {
        console.error("Capture payment error:", error);
        next(error);
    }
};

