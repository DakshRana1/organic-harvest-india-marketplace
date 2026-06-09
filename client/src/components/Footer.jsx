import { useState } from 'react';

const API = 'http://localhost:5000/api';

const footerLinks = {
  'The Brand': ['Our Story', 'Sustainability', 'Farm Partners', 'Certifications'],
  'Customer Care': ['Shipping Policy', 'Refunds & Returns', 'Subscription FAQ', 'Contact Us'],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-stack-lg px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        {/* Brand */}
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-stack-md">
            <img src="/logo.png" alt="OHI Logo" className="w-10 h-10 object-contain" />
            <div>
              <div className="font-serif font-bold text-title-md text-primary leading-none">Organic Harvest India</div>
              <div className="font-sans text-[10px] text-on-surface-variant uppercase tracking-[0.18em] mt-0.5">Premium Conscious Living</div>
            </div>
          </div>
          <p className="font-sans text-body-md text-on-surface-variant mb-stack-md leading-relaxed">
            Nurturing a healthier India through transparent farming and premium conscious living.
          </p>
          <div className="flex gap-4">
            {['public', 'mail', 'call'].map(icon => (
              <a key={icon} href="#" className="text-on-surface-variant hover:text-primary transition-all hover:scale-125 duration-200">
                <span className="material-symbols-outlined">{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-sans font-semibold text-title-md text-primary mb-stack-md">{title}</h4>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="font-sans text-body-md text-on-surface-variant hover:text-primary underline-offset-4 hover:underline transition-all duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="font-sans font-semibold text-title-md text-primary mb-stack-md">Newsletter</h4>
          <p className="text-label-sm text-on-surface-variant mb-4 uppercase tracking-wider">
            Join our conscious community for weekly harvest updates.
          </p>
          {status === 'success' ? (
            <p className="text-secondary font-sans font-semibold text-body-md flex items-center gap-2">
              <span className="material-symbols-outlined material-symbols-filled text-secondary">check_circle</span>
              Thank you! 🌿
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-surface-container-low border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-secondary font-sans text-body-md placeholder:text-outline"
              />
              <button
                type="submit"
                className="bg-primary text-white rounded-xl py-2.5 font-sans font-semibold hover:bg-secondary transition-colors active:scale-95"
              >
                Join Now
              </button>
              {status === 'error' && <p className="text-error text-label-sm">Something went wrong.</p>}
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-outline-variant/20 py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <p className="text-label-sm text-on-surface-variant">
          © {new Date().getFullYear()} Organic Harvest India. Premium Conscious Living. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
