import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 150,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 2000,
        },

        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        image: {
            url: {
                type: String,
                required: true,
            },

            publicId: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;