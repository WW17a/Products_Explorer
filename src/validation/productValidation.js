import * as Yup from "yup";

export const productValidationSchema = Yup.object({
    title: Yup.string()
        .trim()
        .min(2, "Product name must be at least 2 characters")
        .max(100, "Product name must be less than 100 characters")
        .required("Product name is required"),

    price: Yup.number()
        .typeError("Price must be a number")
        .min(0.01, "Price must be greater than 0")
        .required("Price is required"),

    category: Yup.string()
        .trim()
        .required("Category is required"),

    description: Yup.string()
        .trim()
        .min(10, "Description must be at least 10 characters")
        .max(500, "Description must be less than 500 characters")
        .required("Description is required"),
});