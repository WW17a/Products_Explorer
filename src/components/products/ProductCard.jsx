import { Pencil, Trash2 } from "lucide-react";
import { memo } from "react";

const ProductCard = memo(({ product, onSelect, onEdit, onDelete }) => {
  return (
    <div className="relative w-full rounded-lg border border-blue-300 bg-gray-100 p-4 shadow-sm sm:w-[45%] lg:w-[30%] xl:w-[23%]">

      <button
        type="button"
        onClick={() => onEdit(product)}
        aria-label={`Edit ${product.title}`}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      >
        <Pencil size={17} />
      </button>

      <button
        type="button"
        onClick={() => onDelete(product)}
        aria-label={`Delete ${product.title}`}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
      >
        <Trash2 size={17} />
      </button>

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

      <button
        onClick={() => onSelect(product)}
        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-green-700"
      >
        View Details
      </button>
    </div>
  );
});

export default ProductCard;