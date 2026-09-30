import { Link, useParams } from "react-router-dom";

const PaymentSuccess = () => {
    const { orderId } = useParams();

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-4 py-12">
            <div className="w-full rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                    ✓
                </div>

                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    Payment Successful
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                    Your payment has been completed successfully. Your order
                    has been placed.
                </p>

                {orderId && (
                    <p className="mt-4 text-sm text-gray-600">
                        Order ID:{" "}
                        <span className="font-medium text-gray-900">
                            {orderId}
                        </span>
                    </p>
                )}

                <Link
                    to="/products"
                    className="mt-7 inline-block rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    Continue Shopping
                </Link>
            </div>
        </main>
    );
};

export default PaymentSuccess;