import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../services/productApi";
import ProductList from "../components/products/ProductList";
import ProductModal from "../components/products/ProductModel";
import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/pagination/Pagination";
import ProductSkeletonList from "../components/products/ProductSkeletonList";
import ProductToolbar from "../components/products/ProductToolBar";
import Navbar from "../components/layout/Navbar";


const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

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

    const categories = [...new Set(products.map((product) => product.category)),];
    const visibleProducts = useProductFilters(products, search, category, sort);

    const { currentItems, currentPage, totalPages, goToPage, nextPage, previousPage, } = usePagination(visibleProducts, 8);

    if (isLoading) {
        return <ProductSkeletonList />;
    }

    if (error) {
        return <p>Failed to load products : {error}</p>;
    }

    if (products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
      <>
      <Navbar />
        <main className="mx-auto max-w-9xl px-2 py-5 sm:px-6 lg:px-8">
            <ProductToolbar
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                onSortChange={setSort} 
                categories={categories}
                />

            <ProductList
                products={currentItems}
                onSelect={handleSelect}
            />

            <Pagination currentPage={currentPage} totalPages={totalPages} onNext={nextPage} onPrevious={previousPage} onPageChange={goToPage} />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
        </main>
        </>
    );
};

export default Products;