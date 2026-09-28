
const CheckoutSummary = ({subtotal,shipping,total,isSubmitting,onBack,}) => {
    return (
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900">
                Order Summary
            </h2>

            <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-base font-bold text-gray-900">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
                Proceed to Payment
            </button>

            <button
                type="button"
                onClick={onBack}
                className="mt-3 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
                Back to Cart
            </button>
        </aside>
    );
};

export default CheckoutSummary;

