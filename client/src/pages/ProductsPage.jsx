import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API = 'http://localhost:5000/api';

const ALL_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'fruits', name: 'Fruits' },
  { id: 'vegetables', name: 'Vegetables' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'grains', name: 'Grains' },
  { id: 'pantry', name: 'Pantry' },
];

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('default');

  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/products`)
      .then(r => r.json())
      .then(data => { setAllProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    params.delete('search');
    setSearchParams(params);
  };

  let filtered = allProducts;
  if (activeCategory !== 'all') filtered = filtered.filter(p => p.category === activeCategory);
  if (searchQuery) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description?.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen bg-surface">
      {/* Page Header */}
      <div className="bg-primary py-14 px-margin-mobile md:px-margin-desktop">
        <div className="max-w-container-max mx-auto">
          <span className="text-secondary-fixed text-label-sm uppercase tracking-widest font-sans font-semibold mb-3 block">
            Fresh & Organic
          </span>
          <h1 className="font-serif text-display-lg text-white font-bold mb-3">
            {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'all' ? 'All Products' : ALL_CATEGORIES.find(c => c.id === activeCategory)?.name || 'Products'}
          </h1>
          <p className="font-sans text-body-lg text-primary-fixed max-w-xl">
            Sourced directly from certified organic farms across India.
          </p>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10">
        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-sans font-semibold text-body-md transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-primary text-white shadow-organic'
                    : 'bg-surface-container text-on-surface-variant hover:bg-secondary-container hover:text-on-secondary-container'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">sort</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/30 rounded-full px-4 py-2 font-sans text-body-md text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-6">
          {loading ? 'Loading…' : `${filtered.length} product${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-surface-container-low rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <span className="material-symbols-outlined text-[72px] text-outline mb-4 block">search_off</span>
            <p className="font-serif text-headline-lg text-on-surface-variant">No products found</p>
            <p className="font-sans text-body-md text-outline mt-2">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
