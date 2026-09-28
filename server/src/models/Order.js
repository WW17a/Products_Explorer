import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    { _id: false }
);

const shippingAddressSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },
        address: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },
        postalCode: {
            type: String,
            required: true,
            trim: true,
            maxlength: 10,
        },
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Order must contain at least one item",
            },
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },

        shipping: {
            type: Number,
            required: true,
            min: 0,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
            index: true,
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
            index: true,
        },

        paymentId: {
            type: String,
            default: null,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;

