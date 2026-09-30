import apiClient from "./apiClient";

const PAYMENT_API_URL = import.meta.env.VITE_PAYMENT_API_URL;

export const createPayment = async (orderId) => {
    const response = await apiClient(`${PAYMENT_API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create payment");
    }

    return response.json();
};

export const capturePayment = async (paymentId) => {
    const response = await apiClient(`${PAYMENT_API_URL}/${paymentId}/capture`, {
        method: "POST",
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to capture payment");
    }

    return response.json();
};