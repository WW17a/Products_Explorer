import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignUpForm from "../components/auth/SignupForm";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [serverError, setServerError] = useState("");

    const handleSignup = async (values, { setSubmitting }) => {
        try {
            setServerError("");

            await signup(values);
            navigate("/login");
        } catch (error) {
            setServerError(error.response?.data?.message || "Signup failed");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto mt-20 max-w-md p-4">
            <h1 className="mb-6 text-2xl font-bold">
                Create Account
            </h1>

            <SignUpForm
                onSubmit={handleSignup}
                serverError={serverError}
            />

            <p className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600"
                >
                    Sign In
                </Link>
            </p>
        </div>
    );
};  

export default Signup;