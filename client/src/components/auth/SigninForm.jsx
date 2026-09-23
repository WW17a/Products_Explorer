import { useFormik } from "formik";
import * as Yup from "yup";

const SignInForm = ({ onSubmit, serverError }) => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email")
                .required("Email is required"),

            password: Yup.string()
                .required("Password is required"),
        }),

        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block">
                    Email
                </label>
              
                <input
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded border p-2"
                />

                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500">
                        {formik.errors.email}
                    </p>
                )}
            </div>

            <div>
                <label className="mb-1 block">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded border p-2"
                />

                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500">
                        {formik.errors.password}
                    </p>
                )}
            </div>

            {serverError && (
                <p className="text-sm text-red-500">
                    {serverError}
                </p>
            )}

            <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full rounded bg-blue-600 p-2 text-white"
            >
                {formik.isSubmitting ? "Signing In..." : "Sign In"}
            </button>
        </form>
    );
};

export default SignInForm;