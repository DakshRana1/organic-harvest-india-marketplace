import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px) scale(1.1)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <img
          ref={parallaxRef}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_-v9rEWJ4XEuno47XDDiX0vBuDfa35cloc3KnQkXMvj-eZZjVA-LGim47WzDpKhjYyZglQd4nQzifcFM-OXDxFkOGmOI8D6ryJjxxQVfKjTdPYqiiystp7Lr7inOoWoZeiCsxPZ7mergQEdt2fcz0kGj-LL43Mu7Pj28amZqXjOfhHP8hlsQ8jJb9d3c7valXfp1OSskrD2M3jOsQ1_DT-b-vGAZQQy_Pfm9L3To6gKHA3qVaEjSQRXPjWObeZFgS4a0rW-rkCYU"
          alt="Lush organic farm at sunrise"
          className="w-full h-full object-cover scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/65 via-primary/35 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-white">
        <div className="max-w-2xl">
          <span className="hero-entrance inline-block px-4 py-1.5 rounded-full bg-secondary-container/20 backdrop-blur-md text-secondary-fixed text-label-sm mb-stack-sm border border-secondary-fixed/30 uppercase tracking-widest" style={{ animationDelay: '0.1s' }}>
            Farm-to-Table Freshness
          </span>

          {/* Catchline */}
          <div className="hero-entrance flex items-center gap-3 mb-3" style={{ animationDelay: '0.25s' }}>
            <img src="/logo.png" alt="OHI" className="w-9 h-9 object-contain opacity-90 invert brightness-200" />
            <p className="font-sans text-label-sm uppercase tracking-[0.22em] text-white/80 font-semibold">
              Pure · Ethical · Intentional — Straight from India's Finest Farms
            </p>
          </div>

          <h1
            className="hero-entrance font-serif text-[36px] md:text-display-lg font-bold mb-stack-md leading-tight"
            style={{ animationDelay: '0.3s' }}
          >
            Heritage Farming Meets<br />Modern Conscious Living
          </h1>

          <p className="hero-entrance font-sans text-body-lg text-white/90 mb-stack-lg max-w-lg" style={{ animationDelay: '0.5s' }}>
            Directly from India's most pristine organic farms to your doorstep. Transparent, ethical, and intentionally pure.
          </p>

          <div className="hero-entrance flex flex-wrap gap-4" style={{ animationDelay: '0.7s' }}>
            <Link
              to="/products"
              className="bg-primary hover:bg-primary-container text-white px-stack-lg py-4 rounded-full font-sans font-semibold transition-all duration-300 shadow-xl flex items-center gap-2 group active:scale-95"
            >
              Shop Fresh Now
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">arrow_forward</span>
            </Link>
            <Link
              to="/#sustainability"
              className="border border-white/50 hover:bg-white/10 text-white px-stack-lg py-4 rounded-full font-sans font-semibold transition-all duration-300 backdrop-blur-sm active:scale-95"
            >
              Explore Story
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 animate-bounce">
        <span className="material-symbols-outlined text-[28px]">keyboard_arrow_down</span>
      </div>
    </section>
  );
}
