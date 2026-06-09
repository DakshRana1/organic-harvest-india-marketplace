import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartBounce, setCartBounce] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true);
      const t = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalItems]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  const navLinks = [
    { label: 'Fruits', path: '/products?category=fruits' },
    { label: 'Vegetables', path: '/products?category=vegetables' },
    { label: 'Grains', path: '/products?category=grains' },
    { label: 'Dairy', path: '/products?category=dairy' },
    { label: 'Pantry', path: '/products?category=pantry' },
  ];

  return (
    <>
      <div id="scroll-progress" />
      <header className={`bg-surface-container-lowest sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-organic' : ''}`}>
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <img
              src="/logo.png"
              alt="Organic Harvest India Logo"
              className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif font-bold text-primary text-[18px] group-hover:text-secondary transition-colors duration-300 leading-none">
                Organic Harvest India
              </span>
              <span className="font-sans text-[10px] text-on-surface-variant uppercase tracking-[0.18em] group-hover:text-secondary transition-colors duration-300">
                Premium Conscious Living
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-gutter">
            {navLinks.map(l => (
              <Link key={l.label} to={l.path} className="nav-link text-on-surface-variant text-body-md hover:text-secondary transition-colors duration-300">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-stack-sm">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30 focus-within:border-secondary transition-colors">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-body-md w-40 ml-1 placeholder:text-outline"
                placeholder="Search harvest…"
              />
            </form>

            <Link to="/products" className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200 hidden lg:flex">
              <span className="material-symbols-outlined">favorite</span>
            </Link>

            <button
              onClick={onCartOpen}
              className="relative p-2 text-on-surface-variant hover:text-primary transition-colors hover:scale-110 active:scale-95 duration-200"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
              {totalItems > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 bg-secondary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ${cartBounce ? 'cart-badge' : ''}`}>
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">{mobileOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-margin-mobile py-4 flex flex-col gap-4 animate-fade-in-up">
            <form onSubmit={handleSearch} className="flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline text-[20px]">search</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent border-none focus:outline-none text-body-md flex-1 ml-1 placeholder:text-outline"
                placeholder="Search harvest…"
              />
            </form>
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.path}
                onClick={() => setMobileOpen(false)}
                className="text-on-surface-variant text-body-lg hover:text-primary font-sans font-semibold py-1 border-b border-outline-variant/10"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
