import { memo } from "react";

const ProductCard = memo(({ product ,onSelect}) => {
  return (
    <div className="w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] rounded-lg border border-blue-300 bg-gray-100 p-4 shadow-sm">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-48 w-full rounded-md object-cover"
      />
       
      <h2 className="mt-3 text-lg font-semibold">
        {product.title}
      </h2>

      <p className="mt-2 text-xl font-bold text-blue-600">
        ${product.price}
      </p>

      <p className="mt-2 text-sm text-gray-600">
        Rating: {product.rating}
      </p>

      <p className="text-sm text-gray-600">
        Stock: {product.stock}
      </p>

      <p className="text-sm text-gray-600">
        Category: {product.category}
      </p>

      <button onClick={()=>onSelect(product)} className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-green-700">
        View Details
      </button>
    </div>
  );
});

export default ProductCard;