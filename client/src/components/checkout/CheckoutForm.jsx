import { ErrorMessage, Field } from "formik";

const CheckoutForm = () => {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
                Shipping Information
            </h2>

            <div className="mt-5 flex flex-wrap gap-4">
                <div className="w-full">
                    <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Full Name
                    </label>

                    <Field
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <ErrorMessage name="fullName" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)]">
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Phone
                    </label>

                    <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="03XXXXXXXXX"
                        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <ErrorMessage name="phone" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)]">
                    <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-700">
                        City
                    </label>

                    <Field
                        id="city"
                        name="city"
                        type="text"
                        placeholder="Lahore"
                        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <ErrorMessage name="city" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="w-full">
                    <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Address
                    </label>

                    <Field
                        id="address"
                        name="address"
                        as="textarea"
                        rows="3"
                        placeholder="Enter your complete delivery address"
                        className="w-full resize-none rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <ErrorMessage name="address" component="p" className="mt-1 text-sm text-red-600" />
                </div>

                <div className="w-full sm:w-[calc(50%-0.5rem)]">
                    <label htmlFor="postalCode" className="mb-1.5 block text-sm font-medium text-gray-700">
                        Postal Code
                    </label>

                    <Field
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        inputMode="numeric"
                        placeholder="54000"
                        className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <ErrorMessage name="postalCode" component="p" className="mt-1 text-sm text-red-600" />
                </div>
            </div>
        </section>
    );
};

export default CheckoutForm;

