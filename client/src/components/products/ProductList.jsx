import ProductCard from "./ProductCard";

const ProductList = ({onDelete , products, onSelect, onEdit }) => {
  return (

    <div className="flex flex-wrap gap-5 p-5 ">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelect}
          onEdit={onEdit}
          onDelete={onDelete}

        />
      ))}
    </div>
  );
};

export default ProductList;