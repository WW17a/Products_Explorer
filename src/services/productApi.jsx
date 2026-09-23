const API_URL = "https://dummyjson.com/products";

export const getProducts = async (search = "",category = "",sort = "") => {
    let url = API_URL;

    if (category) {
        url = `${API_URL}/category/${encodeURIComponent(category)}`;
    } else if (search) {
        url = `${API_URL}/search?q=${encodeURIComponent(search)}`;
    }

    if (sort) {
        const [sortBy, order] = sort.split("-");

        const separator = url.includes("?") ? "&" : "?";

        url += `${separator}sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products;
};

export const createProduct = async (productData) => {
    const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    });

    if (!response.ok) {
        throw new Error("Failed to create product");
    }

    return response.json();
};


export const updateProduct = async (productId, productData) => {
    const response = await fetch(
        `https://dummyjson.com/products/${productId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update product");
    }

    return response.json();
};