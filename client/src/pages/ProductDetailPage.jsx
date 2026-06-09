import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = 'http://localhost:5000/api';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    Promise.all([
      fetch(`${API}/products/${id}`).then(r => r.json()),
      fetch(`${API}/products`).then(r => r.json()),
    ]).then(([prod, all]) => {
      setProduct(prod);
      setRelated(all.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 4));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4 text-on-surface-variant">
        <span className="material-symbols-outlined text-[64px] animate-spin text-secondary">refresh</span>
        <p className="font-sans text-body-lg">Loading product…</p>
      </div>
    </div>
  );

  if (!product || product.error) return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <span className="material-symbols-outlined text-[72px] text-outline mb-4 block">error</span>
        <p className="font-serif text-headline-lg text-on-surface-variant">Product not found</p>
        <Link to="/products" className="mt-6 inline-block bg-primary text-white px-8 py-3 rounded-full font-sans font-semibold hover:bg-secondary transition-colors">
          Browse Products
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumb */}
      <div className="bg-surface-container-low border-b border-outline-variant/20 px-margin-mobile md:px-margin-desktop py-3">
        <div className="max-w-container-max mx-auto flex items-center gap-2 text-label-sm text-on-surface-variant font-sans uppercase tracking-wider">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors capitalize">{product.category}</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden aspect-square shadow-organic-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {product.badge && (
              <span className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-label-sm font-semibold ${product.badgeColor === 'tertiary' ? 'bg-tertiary-fixed text-on-tertiary-fixed' : 'bg-secondary-container text-on-secondary-container'}`}>
                {product.badge}
              </span>
            )}
            {/* Decorative circle */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary-container/20 rounded-full -z-10" />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="text-secondary font-sans font-semibold text-label-sm uppercase tracking-widest mb-3 block capitalize">
              {product.category}
            </span>

            <h1 className="font-serif text-display-lg font-bold text-primary mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={`material-symbols-outlined text-[18px] ${s <= Math.round(product.rating) ? 'material-symbols-filled text-on-tertiary-container' : 'text-outline'}`}>star</span>
                ))}
              </div>
              <span className="font-sans text-body-md text-on-surface-variant">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-surface-container px-3 py-1.5 rounded-full text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                {product.weight}
              </span>
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full text-label-sm font-semibold uppercase tracking-wider">
                {product.label}
              </span>
              {product.tags?.map(tag => (
                <span key={tag} className="bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-full text-label-sm font-semibold uppercase tracking-wider capitalize">
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-serif font-bold text-display-lg text-primary">₹{product.price}</span>
              <span className="font-sans text-body-md text-on-surface-variant">/ {product.weight}</span>
            </div>

            {/* Description */}
            <p className="font-sans text-body-lg text-on-surface-variant mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3 bg-surface-container-low rounded-full px-4 py-2 border border-outline-variant/30">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className="font-sans font-bold text-title-md text-primary w-8 text-center">{qty}</span>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="text-on-surface-variant hover:text-primary transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-sans font-semibold text-title-md transition-all duration-300 shadow-xl active:scale-95 ${added ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-secondary'}`}
              >
                <span className="material-symbols-outlined material-symbols-filled text-[20px]">
                  {added ? 'check_circle' : 'add_shopping_cart'}
                </span>
                {added ? 'Added to Basket!' : 'Add to Basket'}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-outline-variant/20">
              {[
                { icon: 'verified', label: '100% Organic' },
                { icon: 'local_shipping', label: 'Free Delivery ₹999+' },
                { icon: 'autorenew', label: 'Easy Returns' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1 text-center">
                  <span className="material-symbols-outlined material-symbols-filled text-secondary">{b.icon}</span>
                  <span className="text-label-sm text-on-surface-variant font-sans">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="font-serif text-headline-lg text-primary">More from {product.category}</h2>
                <div className="w-16 h-1 bg-secondary rounded-full mt-2" />
              </div>
              <Link to={`/products?category=${product.category}`} className="text-secondary font-sans font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                View All <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
              {related.map(p => (
                <Link key={p.id} to={`/products/${p.id}`} className="bg-surface-container-lowest rounded-2xl overflow-hidden group shadow-organic hover:shadow-organic-lg hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif font-semibold text-primary mb-1 text-body-md">{p.name}</h3>
                    <p className="font-sans font-bold text-primary">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
