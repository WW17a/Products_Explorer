import { useMemo } from "react";

const useProductFilters = (products,search,category, sort) => {
    return useMemo(() => {
        const searchValue = search.trim().toLowerCase();

        const filteredProducts = products.filter((product) => {
            const matchesSearch =
                !searchValue ||
                product.title.toLowerCase().includes(searchValue);

            const matchesCategory =
                !category ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });

        if (!sort) {
            return filteredProducts;
        }

        const sortedProducts = [...filteredProducts];

        switch (sort) {
            case "price-asc":
                sortedProducts.sort(
                    (a, b) => a.price - b.price
                );
                break;

            case "price-desc":
                sortedProducts.sort(
                    (a, b) => b.price - a.price
                );
                break;

            case "rating-desc":
                sortedProducts.sort(
                    (a, b) => b.rating - a.rating
                );
                break;

            case "name-asc":
                sortedProducts.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            default:
                break;
        }

        return sortedProducts;
    }, [products, search, category, sort]);
};

export default useProductFilters;