import { createContext, useContext, useState } from "react";
import { addToCart, getCart, updateCartItem, removeFromCart } from "../services/cartApi";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const cartCount = cart.items.reduce((total, item) => total + item.quantity, 0);

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await addToCart(productId, quantity);

            setCart(data.cart);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await getCart();

            setCart(data.cart);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateCartItem = async (productId, quantity) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await updateCartItem(productId, quantity);

            setCart(data.cart);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally { setIsLoading(false); }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            setIsLoading(true);
            setError(null);

            const data = await removeFromCart(productId);

            setCart(data.cart);

            return data;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally { setIsLoading(false); }
    };

    const clearCart = () => {
        setCart({ items: [] });
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                isLoading,
                error,
                addToCart: handleAddToCart,
                fetchCart,
                updateCartItem: handleUpdateCartItem,
                removeFromCart: handleRemoveFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
};

