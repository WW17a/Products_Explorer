import { useCallback, useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductList from "../components/ProductList";
import ProductModal from "../components/ProductModel";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getProducts();
         
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []); 

    const handleSelect = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const visibleProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Failed to load products: {error}</p>;
    }

    if (products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-4 w-full max-w-md rounded-md border p-2"
            />

            <ProductList
                products={visibleProducts}
                onSelect={handleSelect}
            />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </div>
    );
};

export default Products;