const Pagination = ({ currentPage, totalPages, onNext, onPrevious, onPageChange, }) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
    }

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <button
                onClick={onPrevious}
                disabled={currentPage === 1}
                className="rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Previous
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded-md px-4 py-2 ${currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border border-gray-300 bg-white"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="rounded-md border border-gray-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;