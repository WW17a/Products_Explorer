import { useFormik } from "formik";
import FormField from "../common/FormField";
import { productValidationSchema } from "../../validation/productValidation";

const ProductForm = ({ product, onSubmit, onClose, isSubmitting }) => {
    const isEditMode = Boolean(product);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: product?.title || "",
            price: product?.price ?? "",
            category: product?.category || "",
            description: product?.description || "",
            rating: product?.rating ?? "",
            stock: product?.stock ?? "",
            image: null,
        },
        validationSchema: productValidationSchema(isEditMode),
        onSubmit: (values) => {
            onSubmit({
                ...values,
                price: Number(values.price),
                rating: Number(values.rating),
                stock: Number(values.stock),
            });
        },
    });

    const fields = [
        { label: "Product Name", name: "title", placeholder: "Enter product name", type: "text" },
        { label: "Price", name: "price", placeholder: "0.00", type: "number", min: "0", step: "0.01" },
        { label: "Category", name: "category", placeholder: "e.g. smartphones", type: "text" },
        { label: "Rating", name: "rating", placeholder: "0 - 5", type: "number", min: "0", max: "5", step: "0.01" },
        { label: "Stock", name: "stock", placeholder: "Available quantity", type: "number", min: "0", step: "1" },
    ];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-hidden">

            <div className="flex w-full max-w-4xl max-h-[90dvh] flex-col rounded-2xl bg-white shadow-2xl overflow-hidden">

                <div className="flex shrink-0 items-start justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {isEditMode ? "Edit Product" : "Add Product"}
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {isEditMode ? "Update your product information." : "Add a new product to your catalog."}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                        aria-label="Close form"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="flex flex-1 flex-col min-h-0">

                    <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name} className={field.name === "title" ? "md:col-span-2" : ""}>
                                    <FormField
                                        label={field.label}
                                        name={field.name}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        min={field.min}
                                        max={field.max}
                                        step={field.step}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.errors[field.name]}
                                        touched={formik.touched[field.name]}
                                    />
                                </div>
                            ))}
                        </div>


                        <div className="mt-5">
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
                                    rows={4}
                                    placeholder="Describe the product..."
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </FormField>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="image" className="mb-1 block text-sm font-medium text-gray-700">
                                Product Image
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={(e) => formik.setFieldValue("image", e.currentTarget.files?.[0] || null)}
                                onBlur={() => formik.setFieldTouched("image", true)}
                                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium hover:file:bg-gray-200"
                            />
                            {isEditMode && <p className="mt-1.5 text-xs text-gray-500">Leave empty to keep the current image.</p>}
                            {formik.touched.image && formik.errors.image && (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.image}</p>
                            )}
                        </div>
                    </div>


                    <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-[#172554] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1e3a8a] disabled:opacity-60 sm:w-auto"
                        >
                            {isSubmitting
                                ? (isEditMode ? "Updating..." : "Adding...")
                                : (isEditMode ? "Update Product" : "Add Product")}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;