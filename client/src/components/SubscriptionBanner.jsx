import { useState } from 'react';

const API = 'http://localhost:5000/api';

export default function SubscriptionBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${API}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error);
      }
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="reveal py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="shimmer-overlay relative rounded-3xl overflow-hidden bg-primary p-8 md:p-12">
        {/* Background veggie image */}
        <div className="absolute top-0 right-0 w-2/5 h-full hidden lg:block opacity-15">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf5qu3f28uh51IBDH66Z-gzUtAAA1ZL7KM42Gg61BiLDRiSKa2YIPXhcEBEL9XqPPbginc4m1qHQptKmwyPFyAwXrF3nrag2hLWFbOVqlkd6zcrPE4gIKK-X_fjPI7UcMqAha-x2ZwmkiU9CPRX2Dm4mgsnvzJuulQ6xhqn9tSYiXJW3TdqTEMXz8DemTdZJSxSskf_I3FBSNyxf8xNpZrWN3_9nKBs3rDTjmRkP0V3OE0bkbddxJfAS8uz00uK0DUGTOgO9uqYY0"
            alt="Weekly subscription basket"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-2xl text-white">
          <h2 className="font-serif text-headline-lg md:text-display-lg font-bold mb-4">
            Harvest Memberships
          </h2>
          <p className="font-sans text-body-lg text-primary-fixed mb-stack-lg">
            Save 20% on your weekly organic essentials with our curated seasonal baskets. Freshness delivered, consistency guaranteed.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-stack-lg">
            {[
              { icon: 'calendar_today', title: 'Weekly Basket', sub: 'Perfect for a family of four.' },
              { icon: 'lock_reset', title: 'Pause Anytime', sub: 'Flexible plans for your lifestyle.' },
              { icon: 'local_shipping', title: 'Free Delivery', sub: 'On all subscription orders.' },
              { icon: 'eco', title: 'Zero Waste Box', sub: 'Fully compostable packaging.' },
            ].map(item => (
              <div
                key={item.title}
                className="bg-primary-container p-5 rounded-2xl border border-primary-fixed/20 hover:bg-primary-container/80 transition-colors cursor-default group"
              >
                <span className="material-symbols-outlined material-symbols-filled text-secondary-fixed mb-2 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="font-sans font-semibold text-title-md text-white mb-1">{item.title}</h4>
                <p className="text-label-sm text-primary-fixed">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Newsletter inline */}
          {status === 'success' ? (
            <div className="flex items-center gap-3 bg-secondary-container/20 rounded-2xl px-6 py-4 text-secondary-fixed font-sans font-semibold">
              <span className="material-symbols-outlined material-symbols-filled text-secondary-fixed">check_circle</span>
              {msg}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-primary-container/60 border border-primary-fixed/30 rounded-full px-6 py-3 text-white placeholder:text-primary-fixed/70 focus:outline-none focus:border-secondary-fixed font-sans text-body-md"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="animate-pulse-ring bg-secondary-fixed text-on-secondary-fixed px-8 py-3 rounded-full font-sans font-semibold hover:scale-105 active:scale-95 transition-all shadow-xl whitespace-nowrap disabled:opacity-60"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe & Save Now'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <p className="text-error-container font-sans text-label-sm mt-2">{msg}</p>
          )}
        </div>
      </div>
    </section>
  );
}
