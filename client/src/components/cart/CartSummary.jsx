import { useNavigate } from "react-router-dom";

const CartSummary = ({ items }) => {
    const navigate = useNavigate();

    const subtotal = items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    const shipping = 10;
    const total = subtotal + shipping;

    return (

        <aside className="rounded-xl border border-gray-600 bg-gray-50 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-400 pb-4">
                Order Summary
            </h2>

            <div className="mt-4 space-y-4 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-400 pt-4 mt-2">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-8 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
            >
                Proceed to Checkout
            </button>
        </aside>
    );
};

export default CartSummary;