import { useMemo } from "react";

const useProductFilters = (products, category, sort) => {
    return useMemo(() => {
        let filteredProducts = products;

        if (category) {
            filteredProducts = filteredProducts.filter(
                (product) => product.category === category
            );
        }

        if (!sort) {
            return filteredProducts;
        }

        const sortedProducts = [...filteredProducts];

        switch (sort) {
            case "price-asc":
                sortedProducts.sort((a, b) => a.price - b.price);
                break;

            case "price-desc":
                sortedProducts.sort((a, b) => b.price - a.price);
                break;

            case "rating-desc":
                sortedProducts.sort((a, b) => b.rating - a.rating);
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
    }, [products, category, sort]);
};

export default useProductFilters;