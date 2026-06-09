import { Link } from 'react-router-dom';

export default function CategoryGrid({ categories = [] }) {
  return (
    <section className="reveal py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-stack-lg">
        <h2 className="font-serif text-headline-lg text-primary mb-3">Shop by Category</h2>
        <div className="w-20 h-1 bg-secondary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-gutter">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.id}`}
            className="group text-center"
          >
            <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-secondary-container group-hover:shadow-[0_0_24px_rgba(27,107,79,0.25)] transition-all duration-500 shadow-organic transform group-hover:scale-105">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Green overlay on hover */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 rounded-full" />
            </div>
            <span className="font-sans font-semibold text-title-md text-primary group-hover:text-secondary transition-colors duration-300">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
