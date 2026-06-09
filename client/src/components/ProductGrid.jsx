import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function ProductGrid({ products = [], title = 'Harvest Picks', subtitle = "The finest selections from this week's harvest.", showViewAll = true }) {
  return (
    <section className="reveal bg-surface-container-low py-section-gap">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <h2 className="font-serif text-headline-lg text-primary">{title}</h2>
            <p className="text-on-surface-variant font-sans text-body-md mt-1">{subtitle}</p>
          </div>
          {showViewAll && (
            <Link to="/products" className="text-secondary font-sans font-semibold flex items-center gap-1 group hover:gap-2 transition-all duration-200">
              View All
              <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
            </Link>
          )}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-[64px] mb-4 block text-outline">inventory_2</span>
            <p className="font-sans text-body-lg">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
