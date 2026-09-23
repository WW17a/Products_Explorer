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
import ConfirmDialog from "../components/common/confirmDialog";
import useDebounce from "../hooks/useDebounce";
import { CATEGORIES } from "../constants/categories";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 400);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const data = await getProducts(debouncedSearch,category,sort);

                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [debouncedSearch , category ,sort]);


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


    const handleDeleteProduct = (product) => {
        setDeletingProduct(product);
    };


    const confirmDeleteProduct = () => {
        setProducts((currentProducts) =>
            currentProducts.filter(
                (product) => product.id !== deletingProduct.id
            )
        );

        setDeletingProduct(null);
    };

    const cancelDeleteProduct = () => {
        setDeletingProduct(null);
    };


    

    const visibleProducts = useProductFilters(
        products,
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
                categories={CATEGORIES}
                onAddProduct={() => setIsProductFormOpen(true)}
            />

            <ProductList
                products={currentItems}
                onSelect={handleSelect}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}

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

            <ConfirmDialog
                isOpen={Boolean(deletingProduct)}
                title="Delete product?"
                message={`Are you sure you want to delete "${deletingProduct?.title}"? This action cannot be undone.`}
                onConfirm={confirmDeleteProduct}
                onCancel={cancelDeleteProduct}
            />

        </main>
    );
};

export default Products;