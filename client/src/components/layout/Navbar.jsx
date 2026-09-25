import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import CategoryMenu from "./Categorymenu";
import { useCart } from "../../context/CartContext";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

const { user, logout } = useAuth();
const { cartCount } = useCart();
  const navigate = useNavigate();

  const initial = user?.name?.charAt(0).toUpperCase();


  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#172554] text-white shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link to="/products" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 font-bold text-[#172554]">
            P
          </div>

          <div>
            <h1 className="text-lg font-bold">Product Explorer</h1>
            <p className="text-xs text-blue-200">Discover something new</p>
          </div>
        </Link>

     
        <div className="hidden items-center md:flex">
          <Link
            to="/products"
            className="rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-cyan-300"
          >
            Products
          </Link>

          <div className="ml-1">
            <CategoryMenu />
          </div>

          <Link
            to="/about"
            className="ml-1 rounded-lg px-4 py-2 text-sm text-blue-100 transition hover:bg-white/10 hover:text-white"
          >
            About
          </Link>

          <div className="mx-4 h-8 w-px bg-blue-300/20" />

        
          <Link
            to="/cart"
            aria-label={`Cart (${cartCount} items)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-[#172554] ring-2 ring-[#172554]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </Link>

          <div
            ref={userMenuRef}
            className="relative ml-6 flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() => setIsUserMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={isUserMenuOpen}
              aria-label={`User menu for ${user?.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-bold text-[#172554] transition hover:ring-2 hover:ring-cyan-300/50"
            >
              {initial}
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-[#0f1f46] shadow-xl transition-opacity duration-150 ${
                isUserMenuOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="px-4 py-3">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex h-9 items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 text-xs font-semibold text-red-200 transition hover:bg-red-500/20 hover:text-red-100"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            to="/cart"
            aria-label={`Cart (${cartCount} items)`}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white transition hover:bg-white/10"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-[#172554] ring-2 ring-[#172554]">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg bg-white/10 px-3 py-2 text-xl"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0f172a] px-4 py-4 md:hidden">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 font-bold text-[#172554]">
              {initial}
            </div>

            <span className="font-medium">{user?.name}</span>
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
              type="button"
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