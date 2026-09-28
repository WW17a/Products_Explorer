import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../services/productApi";
import { toast } from 'sonner'
import ProductList from "../components/products/ProductList";
import ProductModal from "../components/products/ProductModel";
import ProductForm from "../components/products/ProductForm";
import ProductSkeletonList from "../components/products/ProductSkeletonList";
import ProductToolbar from "../components/products/ProductToolBar";

import Pagination from "../components/pagination/Pagination";
import ConfirmDialog from "../components/common/confirmDialog";
import useDebounce from "../hooks/useDebounce";
import { CATEGORIES } from "../constants/categories";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalProducts: 0, limit: 8, });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const location = useLocation();
    const { addToCart } = useCart();
    const {user} = useAuth();
    const isAdmin = user?.role === "admin"

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const data = await getProducts({ search: debouncedSearch, category, sort, page, limit: 8, });
                setProducts(data.products);
                setPagination(data.pagination);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [debouncedSearch, category, sort, page]);

    useEffect(() => {
        setCategory(location.state?.category || "");
    }, [location.state?.category]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, category, sort]);

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
            const result = await createProduct(productData);
            setProducts((currentProducts) => [
                result.product,
                ...currentProducts,
            ]);
            setIsProductFormOpen(false);
            toast.success(result.message || "Product added successfully");
        } catch (error) {
            toast.error(error.message || "Failed to add product");
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleUpdateProduct = async (productData) => {
        try {
            setIsSubmitting(true);
            setError(null);

            const result = await updateProduct(
                editingProduct._id,
                productData
            );

            setProducts((currentProducts) =>
                currentProducts.map((product) =>
                    product._id === result.product._id ? result.product : product)
            );

            setEditingProduct(null);

            toast.success(
                result.message || "Product updated successfully"
            );
        } catch (error) {
            toast.error(
                error.message || "Failed to update product"
            );
        } finally {
            setIsSubmitting(false);
        }
    };


    const handleDeleteProduct = (product) => {
        setDeletingProduct(product);
    };


    const handleAddToCart = async (product) => {
        try {
            await addToCart(product._id, 1);

            toast.success(`${product.title} added to cart`);
        } catch (error) {
            toast.error(error.message || "Failed to add product to cart");
        }
    };


    const confirmDeleteProduct = async () => {
        try {
            setIsSubmitting(true);
            const result = await deleteProduct(deletingProduct._id);
            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product._id !== deletingProduct._id
                )
            );
            setDeletingProduct(null);
            toast.success(result.message || "Product deleted successfully");
        } catch (error) {
            toast.error(error.message || "Failed to delete product");
        } finally {
            setIsSubmitting(false);
        }
    };
    const cancelDeleteProduct = () => {
        setDeletingProduct(null);
    };


    if (isLoading) {
        return <ProductSkeletonList />;
    }

    if (error) {
        return <p>Failed to load products: {error}</p>;
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
                isAdmin={isAdmin}
            />

            {products.length > 0 ? (
                <ProductList
                    products={products}
                    onSelect={handleSelect}
                    onEdit={handleEditProduct}
                    onDelete={handleDeleteProduct}
                    onAddToCart={handleAddToCart}
                    isAdmin={isAdmin}

                />
            ) : (
                <div className="py-16 text-center">
                    <p className="text-lg font-semibold text-gray-700">
                        No products found
                    </p>
                    {search && (
                        <p className="mt-2 text-sm text-gray-500">
                            No products match "{search}".
                        </p>
                    )}
                </div>
            )}

            <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onNext={() => setPage((currentPage) => currentPage + 1)}
                onPrevious={() => setPage((currentPage) => currentPage - 1)}
                onPageChange={setPage}
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
                isSubmitting={isSubmitting}
            />

        </main>
    );
};

export default Products;