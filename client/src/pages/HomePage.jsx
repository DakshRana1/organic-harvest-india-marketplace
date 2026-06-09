import { useEffect, useRef, useState } from 'react';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import SubscriptionBanner from '../components/SubscriptionBanner';
import SustainabilitySection from '../components/SustainabilitySection';
import { API } from '../config';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/products`).then(r => r.json()),
      fetch(`${API}/categories`).then(r => r.json()),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      setCategories(cats);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  // Scroll progress bar
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = `${(winScroll / height) * 100}%`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading]);

  const harvestPicks = products.slice(0, 4);

  return (
    <main>
      <HeroSection />
      <TrustBar />
      <CategoryGrid categories={categories} />
      <ProductGrid
        products={harvestPicks}
        title="Harvest Picks"
        subtitle="The finest selections from this week's harvest."
      />
      <SubscriptionBanner />
      <SustainabilitySection />
    </main>
  );
}
