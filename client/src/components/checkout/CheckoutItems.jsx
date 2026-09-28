
const CheckoutItems = ({ items }) => {
    return (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
                Order Items
            </h2>

            <div className="mt-5 divide-y divide-gray-200">
                {items.map((item) => (
                    <div
                        key={item.product._id}
                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                    >
                        <img
                            src={item.product.image.url}
                            alt={item.product.title}
                            className="h-16 w-16 rounded-md object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <h3 className="truncate text-sm font-semibold text-gray-900">
                                {item.product.title}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>

                        <p className="text-sm font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CheckoutItems;

