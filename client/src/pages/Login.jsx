import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignInForm from "../components/auth/SigninForm";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [serverError, setServerError] = useState("");

    const handleLogin = async (values, { setSubmitting }) => {
        try {
            setServerError("");

            await login({
                email: values.email,
                password: values.password,
            });

            navigate("/products");
        } catch (error) {
            setServerError(
                error.response?.data?.message || "Login failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto mt-20 max-w-md p-4">
            <h1 className="mb-6 text-2xl font-bold">
                Sign In
            </h1>

            <SignInForm
                onSubmit={handleLogin}
                serverError={serverError}
            />

            <p className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link
                    to="/signup"
                    className="text-blue-600"
                >
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;