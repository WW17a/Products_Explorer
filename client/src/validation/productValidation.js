import * as Yup from "yup";

export const productValidationSchema = (isEditMode = false) =>
    Yup.object({
        title: Yup.string()
            .trim()
            .min(2, "Product name must be at least 2 characters")
            .max(150, "Product name must be less than 150 characters")
            .required("Product name is required"),

        price: Yup.number()
            .typeError("Price must be a number")
            .min(0, "Price cannot be negative")
            .required("Price is required"),

        category: Yup.string()
            .trim()
            .required("Category is required"),

        description: Yup.string()
            .trim()
            .min(10, "Description must be at least 10 characters")
            .max(2000, "Description must be less than 2000 characters")
            .required("Description is required"),

        rating: Yup.number()
            .typeError("Rating must be a number")
            .min(0, "Rating cannot be less than 0")
            .max(5, "Rating cannot be greater than 5")
            .required("Rating is required"),

        stock: Yup.number()
            .typeError("Stock must be a number")
            .integer("Stock must be a whole number")
            .min(0, "Stock cannot be negative")
            .required("Stock is required"),

        image: Yup.mixed()
            .nullable()
            .test(
                "fileType",
                "Only JPG, PNG, and WebP images are allowed",
                (file) => {
                    if (!file) return true;

                    return [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                    ].includes(file.type);
                }
            )
            .test(
                "fileSize",
                "Image must be less than 5MB",
                (file) => {
                    if (!file) return true;

                    return file.size <= 5 * 1024 * 1024;
                }
            )
            .test(
                "required",
                "Product image is required",
                (file) => isEditMode || Boolean(file)
            ),
    });