import ProductCard from "./ProductCard";

const ProductList = ({ onDelete, products, onSelect, onEdit, onAddToCart }) => {
  return (

    <div className="flex flex-wrap gap-5 p-5 ">

      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;