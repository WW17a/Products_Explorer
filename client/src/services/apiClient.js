
const apiClient = async (url, options = {}) => {
    const storedUser = sessionStorage.getItem("user");

    let token = null;

    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            token = user?.token;
        } catch {
            sessionStorage.removeItem("user");
        }
    }

    const headers = {
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        headers,
    });
};

export default apiClient;

