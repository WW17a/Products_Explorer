import ProductCard from "./ProductCard";

const ProductList = ({ onDelete, products, onSelect, onEdit, onAddToCart ,isAdmin}) => {
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
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default ProductList;