import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CategoryMenu from "./Categorymenu";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate("/login");
    };

    const initial = user?.name?.charAt(0).toUpperCase();

    return (
        <header className="sticky top-0 z-50 bg-[#172554] text-white shadow-lg">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

               
                <Link to="/products" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-[#172554]">
                        P
                    </div>

                    <div>
                        <h1 className="text-lg font-bold">
                            Product Explorer
                        </h1>

                        <p className="text-xs text-blue-200">
                            Discover something new
                        </p>
                    </div>
                </Link>

               
                <div className="hidden items-center gap-2 md:flex">
                    <Link
                        to="/products"
                        className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-cyan-300"
                    >
                        Products
                    </Link>

                    <CategoryMenu />

                    <Link
                        to="/about"
                        className="rounded-lg px-4 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
                    >
                        About
                    </Link>

                    <div className="mx-3 h-8 w-px bg-blue-300/20" />

                   
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-bold text-[#172554]">
                            {initial}
                        </div>

                        <span className="max-w-28 truncate text-sm font-medium">
                            {user?.name}
                        </span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="ml-2 rounded-lg border border-red-300/30 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/15 hover:text-red-100"
                    >
                        Logout
                    </button>
                </div>

               
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-lg bg-white/10 px-3 py-2 text-xl md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>
            </nav>

           
            {isMenuOpen && (
                <div className="border-t border-white/10 bg-[#0f172a] px-4 py-4 md:hidden">

                   
                    <div className="mb-4 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-[#172554]">
                            {initial}
                        </div>

                        <span className="font-medium">
                            {user?.name}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">

                        <Link
                            to="/products"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg bg-white/10 px-4 py-3 text-cyan-300"
                        >
                            Products
                        </Link>

                        <CategoryMenu />

                        <Link
                            to="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg px-4 py-3 text-blue-100 hover:bg-white/10"
                        >
                            About
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="mt-2 rounded-lg bg-red-500/10 px-4 py-3 text-left text-red-300"
                        >
                            Logout
                        </button>

                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;