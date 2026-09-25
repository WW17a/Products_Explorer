import CartItem from "./CartItem";

const CartList = ({ items }) => {
    return (
        <div className="space-y-4">
            {items.map((item) => (
                <CartItem key={item.product._id} item={item} />
            ))}
        </div>
    );
};

export default CartList;

