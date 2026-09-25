const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-hidden backdrop-blur-sm">
      
      <div className="flex w-full max-w-lg max-h-[85vh] flex-col rounded-lg bg-white shadow-xl overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-2xl font-bold">
            {product.title}
          </h2>

          <img
            src={product.image.url}
            alt={product.title}
            className="mt-4 h-60 w-full rounded-md object-cover"
          />

          <p className="mt-4 text-gray-700">
            {product.description}
          </p>

          <p className="mt-3 text-xl font-bold text-blue-600">
            ${product.price}
          </p>
        </div>

        <div className="border-t border-gray-100 bg-gray-50 p-4">
          <button
            onClick={onClose}
            className="w-full rounded-md bg-gray-800 px-4 py-2.5 text-white transition hover:bg-gray-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductModal;