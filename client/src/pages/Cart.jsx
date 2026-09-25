
import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartList from "../components/cart/CartList";

const Cart = () => {
    const { cart, isLoading, error, fetchCart } = useCart();

    useEffect(() => {
        fetchCart();
    }, []);

    if (isLoading && cart.items.length === 0) {
        console.log("here is the loading state became correct ")
        return <p className="p-6 text-center">Loading cart...</p>;
    }

    if (error) {
        return <p className="p-6 text-center text-red-600">{error}</p>;
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>

                <p className="mt-1 text-sm text-gray-500">
                    {cart.items.length} items in your cart
                </p>
            </div>

            {cart.items.length > 0 ? (
                <CartList items={cart.items} />
            ) : (
                <div className="rounded-lg border border-gray-200 bg-white p-10 text-center">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Your cart is empty
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Add some products to your cart to see them here.
                    </p>
                </div>
            )}
        </main>
    );
};

export default Cart;

