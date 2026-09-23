import { useEffect, useMemo, useState } from "react";

const usePagination = (items, itemsPerPage = 8) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);

    useEffect(() => {
        setCurrentPage((page) => {
            return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
        });
    }, [totalPages]);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;

        return items.slice(
            startIndex,
            startIndex + itemsPerPage
        );
    }, [items, currentPage, itemsPerPage]);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const nextPage = () => {
        setCurrentPage((page) => Math.min(page + 1, totalPages));
    };

    const previousPage = () => {
        setCurrentPage((page) => Math.max(page - 1, 1));
    };

    return {
        currentItems,
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        previousPage,
    };
};

export default usePagination;