import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createProduct, getProducts, updateProduct } from "../services/productApi";

import ProductList from "../components/products/ProductList";
import ProductModal from "../components/products/ProductModel";
import ProductForm from "../components/products/ProductForm";
import ProductSkeletonList from "../components/products/ProductSkeletonList";
import ProductToolbar from "../components/products/ProductToolBar";

import Pagination from "../components/pagination/Pagination";

import useProductFilters from "../hooks/useProductFilters";
import usePagination from "../hooks/usePagination";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const location = useLocation();

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

    useEffect(() => {
        setCategory(location.state?.category || "");
    }, [location.state?.category]);

    const handleSelect = useCallback((product) => {
        setSelectedProduct(product);
    }, []);

    const handleEditProduct = useCallback((product) => {
        setEditingProduct(product);
    }, []);

    const handleAddProduct = async (productData) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const newProduct = await createProduct(productData);

            setProducts((currentProducts) => [
                newProduct,
                ...currentProducts,
            ]);

            setIsProductFormOpen(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };



    const handleUpdateProduct = async (productData) => {
        try {
            setIsSubmitting(true);

            const updatedProduct = await updateProduct(
                editingProduct.id,
                productData
            );

            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product.id === updatedProduct.id
                        ? updatedProduct
                        : product
                )
            );

            setEditingProduct(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };


    const categories = [
        ...new Set(products.map((product) => product.category)),
    ];

    const visibleProducts = useProductFilters(
        products,
        search,
        category,
        sort
    );

    const {
        currentItems,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        previousPage,
    } = usePagination(visibleProducts, 8);

    if (isLoading) {
        return <ProductSkeletonList />;
    }

    if (error) {
        return <p>Failed to load products: {error}</p>;
    }

    if (products.length === 0) {
        return <p>No products found.</p>;
    }

    return (
        <main className="mx-auto max-w-9xl px-2 py-5 sm:px-6 lg:px-8">
            <ProductToolbar
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                sort={sort}
                onSortChange={setSort}
                categories={categories}
                onAddProduct={() => setIsProductFormOpen(true)}
            />

            <ProductList
                products={currentItems}
                onSelect={handleSelect}
                onEdit={handleEditProduct}

            />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={nextPage}
                onPrevious={previousPage}
                onPageChange={goToPage}
            />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}

            {isProductFormOpen && (
                <ProductForm
                    onSubmit={handleAddProduct}
                    onClose={() => setIsProductFormOpen(false)}
                    isSubmitting={isSubmitting}
                />
            )}

            {editingProduct && (
                <ProductForm
                    product={editingProduct}
                    onSubmit={handleUpdateProduct}
                    onClose={() => setEditingProduct(null)}
                    isSubmitting={isSubmitting}
                />
            )}

        </main>
    );
};

export default Products;