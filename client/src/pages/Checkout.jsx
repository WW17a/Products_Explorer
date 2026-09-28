import { useMemo } from "react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderApi";
import checkoutSchema from "../validation/checkoutSchema";
import CheckoutForm from "../components/checkout/CheckoutForm";
import CheckoutItems from "../components/checkout/CheckoutItems";
import CheckoutSummary from "../components/checkout/CheckoutSummary";

const SHIPPING_COST = 10;

const Checkout = () => {
    const navigate = useNavigate();
    const { cart } = useCart();

    const subtotal = useMemo(
        () => cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
        [cart.items]
    );

    const total = subtotal + SHIPPING_COST;

    if (cart.items.length === 0) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <h1 className="text-xl font-semibold text-gray-800">
                        Your cart is empty
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Add some products before proceeding to checkout.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate("/products")}
                        className="mt-5 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Continue Shopping
                    </button>
                </div>
            </main>
        );
    }

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const data = await createOrder(values);

            toast.success("Order created successfully");

            console.log("Created order:", data.order);

            // Payment integration will start here.
        } catch (error) {
            toast.error(error.message || "Failed to create order");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

                <p className="mt-1 text-sm text-gray-500">
                    Enter your shipping information and review your order.
                </p>
            </div>

            <Formik
                initialValues={{fullName: "",phone: "",address: "",city: "",postalCode: ""}}
                validationSchema={checkoutSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-6 lg:flex-row">
                        <div className="space-y-6 lg:flex-1">
                            <CheckoutForm />
                            <CheckoutItems items={cart.items} />
                        </div>

                        <div className="lg:w-[360px]">
                            <CheckoutSummary
                                subtotal={subtotal}
                                shipping={SHIPPING_COST}
                                total={total}
                                isSubmitting={isSubmitting}
                                onBack={() => navigate("/cart")}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </main>
    );
};

export default Checkout;

