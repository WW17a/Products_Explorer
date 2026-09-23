import { PRODUCT_SORT_OPTIONS } from "../../constants/productSort";



const ProductToolbar = ({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    sort,
    onSortChange,
    categories,
    onAddProduct,
}) => {
    return (
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center">

            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:flex-1"
            />


            <div className="flex w-full gap-4 lg:w-auto">

                <select
                    value={category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="min-w-0 flex-1 rounded-lg border border-gray-500 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:w-52 lg:flex-none"
                >
                    <option value="">All Categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>


                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="..."
                >
                    <option value="">Sort By</option>

                    {PRODUCT_SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>


                <button
                    type="button"
                    onClick={onAddProduct}
                    className="whitespace-nowrap rounded-lg bg-[#172554] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                >
                    + Add Product
                </button>


            </div>
        </div>
    );
};

export default ProductToolbar;