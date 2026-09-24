const API_URL = import.meta.env.VITE_API_URL;
const getErrorMessage = async (response, fallbackMessage) => {
    try {
        const data = await response.json();

        return data.message || fallbackMessage;
    } catch {
        return fallbackMessage;
    }
};

export const getProducts = async ({ search = "", category = "", sort = "", page = 1, limit = 8,
} = {}) => {
    const params = new URLSearchParams();

    if (search) params.append("search", search)
    if (category) params.append("category", category)

    if (sort) {
        const [sortBy, order] = sort.split("-");
        params.append("sortBy", sortBy);
        params.append("order", order);
    }
    params.append("page", page);
    params.append("limit", limit);
    const queryString = params.toString();
    const url = `${API_URL}?${queryString}`;

    console.log("this is final url being called towards server", url)
    const response = await fetch(url);

    if (!response.ok) {
        const message = await getErrorMessage(response, "Failed to fetch products");
        throw new Error(message);
    }
    const data = await response.json();
    return data;
};

export const createProduct = async (productData) => {
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("rating", productData.rating);
    formData.append("stock", productData.stock);
    formData.append("image", productData.image);

    const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "Failed to create product"
        );

        throw new Error(message);
    }

    const data = await response.json();

    return data;
};

export const updateProduct = async (productId, productData) => {
    const formData = new FormData();

    formData.append("title", productData.title);
    formData.append("description", productData.description);
    formData.append("category", productData.category);
    formData.append("price", productData.price);
    formData.append("rating", productData.rating);
    formData.append("stock", productData.stock);

    if (productData.image) {
        formData.append("image", productData.image);
    }

    const response = await fetch(`${API_URL}/${productId}`, {
        method: "PUT",
        body: formData,
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "Failed to update product"
        );

        throw new Error(message);
    }

    const data = await response.json();

    return data;
};


export const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/${productId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "Failed to delete product"
        );

        throw new Error(message);
    }

    const data = await response.json();

    return data;
};