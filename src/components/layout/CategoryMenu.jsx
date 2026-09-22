import { useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/productApi";
import { useNavigate } from "react-router-dom";

const CategoryMenu = ({ mobile = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const menuRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const products = await getProducts();
                const uniqueCategories = [ ...new Set( products.map((product) => product.category)),];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!menuRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const handleCategorySelect = (category) => {
        navigate("/products", {
            state: { category },
        });

        setIsOpen(false);
    };


    return (
        <div
            ref={menuRef}
            className={mobile ? "w-full" : "relative"}
        >
            <button
                type="button"
                onClick={() => setIsOpen((open) => !open)}
                aria-expanded={isOpen}
                className={`
                    flex items-center justify-between gap-2
                    rounded-lg px-4 py-2
                    text-sm text-blue-100
                    transition hover:bg-white/10 hover:text-white
                    ${mobile ? "w-full py-3" : ""}
                `}
            >
                Categories

                <span
                    className={`transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    ⌄
                </span>
            </button>

            {isOpen && (
                <div
                    className={`z-50 rounded-xl border border-white/10 bg-[#0f1f46] p-2 shadow-xl
                        ${mobile ? "mt-1 w-full" : "absolute left-0 top-full mt-2 w-64"
                        }
                    `}
                >
                    <div className="max-h-64 overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => handleCategorySelect("")}
                            className=" w-full rounded-lg px-3 py-2.5 text-left text-sm text-blue-100 transition  hover:bg-white/10   hover:text-cyan-30   "
                        >
                            All Categories
                        </button>

                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategorySelect(category)}
                                className=" w-full rounded-lg px-3 py-2.5 text-left text-sm text-blue-100 transition hover:bg-white/10 hover:text-cyan-300"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryMenu;