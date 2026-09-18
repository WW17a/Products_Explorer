const ProductModal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-lg bg-white p-6">
        <h2 className="text-2xl font-bold">
          {product.title}
        </h2>

        <img
          src={product.thumbnail}
          alt={product.title}
          className="mt-4 h-60 w-full rounded-md object-cover"
        />

        <p className="mt-4">
          {product.description}
        </p>

        <p className="mt-3 text-xl font-bold">
          ${product.price}
        </p>

        <button
          onClick={onClose}
          className="mt-5 rounded-md bg-gray-800 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductModal;