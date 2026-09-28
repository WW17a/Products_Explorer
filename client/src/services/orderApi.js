import apiClient from "./apiClient";

const API_URL = `${import.meta.env.VITE_API_URL}/orders`;

const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const data = await response.json();
        return data.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
};

export const createOrder = async (shippingAddress) => {
    const response = await apiClient(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress }),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "Failed to create order"
        );

        throw new Error(message);
    }

    return response.json();
};

