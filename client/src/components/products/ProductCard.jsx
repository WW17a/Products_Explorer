import { Pencil, Trash2, ShoppingCart } from "lucide-react";
import { memo } from "react";

const ProductCard = memo(
  ({ product, onSelect, onEdit, onDelete, onAddToCart }) => {
    return (
      <div className="relative flex flex-col w-full rounded-lg border border-blue-300 bg-gray-200 p-4 shadow-sm sm:w-[45%] lg:w-[30%] xl:w-[23%]">
    
        <button
          type="button"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.title}`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
          src={product.image.url}
          alt={product.title}
          className="h-48 w-full rounded-md object-cover"
        />

        <h2 className="mt-3 truncate text-lg font-semibold">
          {product.title}
        </h2>

        <p className="mt-2 text-xl font-bold text-blue-600">
          ${product.price}
        </p>

        <p className="mt-2 text-sm text-gray-600">Rating: {product.rating}</p>
        <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        <p className="text-sm text-gray-600">Category: {product.category}</p>

     
        <div className="mt-3 flex w-full items-center gap-2">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            aria-label={`Add ${product.title} to cart`}
            className="group flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-black hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <ShoppingCart
              size={16}
              className="shrink-0 transition-transform group-hover:-translate-y-0.5"
            />
            <span className="truncate">Add to Cart</span>
          </button>

          <button
            type="button"
            onClick={() => onSelect(product)}
            className="flex flex-1 items-center justify-center rounded-md border border-blue-500 bg-white px-3 py-2 text-sm font-medium text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <span className="truncate">View Details</span>
          </button>
        </div>
      </div>
    );
  }
);

export default ProductCard;