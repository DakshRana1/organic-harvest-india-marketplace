import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const badgeStyles = {
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed',
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [cartAnim, setCartAnim] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    setCartAnim(true);
    setAdded(true);
    setTimeout(() => {
      setCartAnim(false);
      setAdded(false);
    }, 1000);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden group shadow-organic hover:shadow-organic-lg hover:-translate-y-2 transition-all duration-300 flex flex-col">
      {/* Image */}
      <Link to={`/products/${product.id}`} className="relative block h-60 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-label-sm font-semibold ${badgeStyles[product.badgeColor] || badgeStyles.secondary}`}>
            {product.badge}
          </span>
        )}
        {/* Tags */}
        {product.tags?.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} className="bg-secondary-container/80 backdrop-blur-sm text-on-secondary-container text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full tracking-wider">
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-serif font-semibold text-title-md text-primary hover:text-secondary transition-colors leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-on-tertiary-container shrink-0 ml-2">
            <span className="material-symbols-outlined material-symbols-filled text-[15px]">star</span>
            <span className="text-label-sm">{product.rating}</span>
          </div>
        </div>

        <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-4">
          {product.weight} • {product.label}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="font-sans font-bold text-title-md text-primary">₹{product.price}</span>
          <button
            onClick={handleAdd}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg active:scale-90 ${added ? 'bg-secondary' : 'bg-primary hover:bg-secondary'} text-white`}
          >
            <span className={`material-symbols-outlined text-[18px] ${cartAnim ? 'animate-cart-pop' : ''}`}>
              {added ? 'check' : 'add_shopping_cart'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
