import apiClient from "./apiClient";
const API_URL = `${import.meta.env.VITE_API_URL}/cart`;

const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const data = await response.json();
        return data.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await apiClient(`${API_URL}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
    });

    if (!response.ok) {
        const message = await getErrorMessage(response, "Failed to add product to cart");
        throw new Error(message);
    }

    return response.json();
};

export const getCart = async () => {
    const response = await apiClient(API_URL);

    if (!response.ok) {
        const message = await getErrorMessage(response, "Failed to fetch cart");
        throw new Error(message);
    }

    return response.json();
};

export const updateCartItem = async (productId, quantity) => {
    const response = await apiClient(`${API_URL}/items/${productId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        const message = await getErrorMessage(response, "Failed to update cart item");
        throw new Error(message);
    }

    return response.json();
};

export const removeFromCart = async (productId) => {
    const response = await apiClient(`${API_URL}/items/${productId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const message = await getErrorMessage(response, "Failed to remove product from cart");
        throw new Error(message);
    }

    return response.json();
};

