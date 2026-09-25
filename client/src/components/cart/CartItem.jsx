
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
    const { product, quantity } = item;
    const { updateCartItem, removeFromCart, isLoading } = useCart();

    const handleQuantityChange = async (newQuantity) => {
        try {
            await updateCartItem(product._id, newQuantity);
        } catch (error) {
            toast.error(error.message || "Failed to update quantity");
        }
    };

    const handleRemove = async () => {
        try {
            await removeFromCart(product._id);
            toast.success(`${product.title} removed from cart`);
        } catch (error) {
            toast.error(error.message || "Failed to remove product");
        }
    };

    const actionButtonClass = isLoading ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300 opacity-60" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100";

    return (
        <article className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
            <img src={product.image.url} alt={product.title} className="h-28 w-full rounded-lg object-cover sm:h-24 sm:w-24" />

            <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-gray-900">{product.title}</h2>
                <p className="mt-1 text-sm text-gray-500">Category: {product.category}</p>
                <p className="mt-2 text-lg font-bold text-blue-600">${product.price}</p>
                <p className="mt-1 text-sm text-gray-500">{product.stock} available</p>
            </div>

            <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => handleQuantityChange(quantity - 1)} disabled={isLoading || quantity <= 1} className={`flex h-9 w-9 items-center justify-center rounded-md border transition ${actionButtonClass}`}>
                        <Minus size={16} />
                    </button>

                    <div className="flex h-9 min-w-12 items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-800">
                        {quantity}
                    </div>

                    <button type="button" onClick={() => handleQuantityChange(quantity + 1)} disabled={isLoading || quantity >= product.stock} className={`flex h-9 w-9 items-center justify-center rounded-md border transition ${actionButtonClass}`}>
                        <Plus size={16} />
                    </button>
                </div>

                <button type="button" onClick={handleRemove} disabled={isLoading} className={`flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-medium transition ${isLoading ? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-300 opacity-60" : "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"}`}>
                    <Trash2 size={16} />
                    Remove
                </button>
            </div>
        </article>
    );
};

export default CartItem;

