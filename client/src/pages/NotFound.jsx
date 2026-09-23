import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-xl text-center">

                <div className="mb-6">
                    <p className="text-8xl font-bold tracking-tight text-blue-600">
                        404
                    </p>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Page Not Found
                </h1>

                <p className="mx-auto mt-4 max-w-md text-gray-600">
                    Sorry, we couldn't find the page you're looking for.
                    It may have been moved or doesn't exist.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        to="/products"
                        className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                    >
                        Back to Products
                    </Link>

                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </main>
    );
};

export default NotFound;