import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
            unique: true,
            index: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        provider: {
            type: String,
            enum: ["paypal"],
            required: true,
        },

        providerOrderId: {
            type: String,
            default: null,
            unique: true,
            sparse: true,
            index: true,
        },
        approveUrl: {
            type: String,
            default: null,
            trim: true,
        },

        providerPaymentId: {
            type: String,
            default: null,
            trim: true,
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        currency: {
            type: String,
            required: true,
            default: "USD",
            uppercase: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "paid",
                "failed",
                "unknown",
                "refunded",
                "partially_refunded",
            ],
            default: "pending",
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;