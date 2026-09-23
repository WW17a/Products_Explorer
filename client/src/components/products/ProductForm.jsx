import { useFormik } from "formik";
import FormField from "../common/FormField";
import { productValidationSchema } from "../../validation/productValidation";

const ProductForm = ({ product, onSubmit, onClose, isSubmitting }) => {

    const isEditMode = Boolean(product);

    const formik = useFormik({

        enableReinitialize: true,

        initialValues: {
            title: product?.title || "",
            price: product?.price || "",
            category: product?.category || "",
            description: product?.description || "",
        },


        validationSchema: productValidationSchema,

        onSubmit: (values) => {
            onSubmit({
                ...values,
                price: Number(values.price),
            });
        },
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">


                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditMode ? "Edit Product" : "Add Product"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Add a new product to your catalog.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                        aria-label="Close form"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-4"
                >
                    <FormField
                        label="Product name"
                        name="title"
                        placeholder="Enter product name"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.title}
                        touched={formik.touched.title}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                            label="Price"
                            name="price"
                            type="number"
                            placeholder="0.00"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.price}
                            touched={formik.touched.price}
                        />

                        <FormField
                            label="Category"
                            name="category"
                            placeholder="e.g. smartphones"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.category}
                            touched={formik.touched.category}
                        />
                    </div>

                    <FormField
                        label="Description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.description}
                        touched={formik.touched.description}
                    >
                        <textarea
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Describe the product..."
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </FormField>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-[#172554] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e3a8a] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? isEditMode ? "Updating..." : "Adding...": isEditMode ? "Update Product" : "Add Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;