import { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { capturePayment } from "../../services/paymentApi";

const PayPalPayment = ({ payment, onSuccess }) => {
    const [isCapturing, setIsCapturing] = useState(false);

    const options = {
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: payment.currency,
        intent: "capture",
    };

    const handleApprove = async () => {
        try {
            setIsCapturing(true);

            const paymentData = await capturePayment(payment.id);

            console.log("Capture response:", paymentData);

            onSuccess(paymentData.payment);
        } catch (error) {
            console.error("Payment capture failed:", error);
        } finally {
            setIsCapturing(false);
        }
    };

    return (
        <PayPalScriptProvider options={options}>
            <PayPalButtons
                createOrder={() => payment.providerOrderId}
                onApprove={handleApprove}
                disabled={isCapturing}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalPayment;