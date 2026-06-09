const badges = [
  {
    icon: 'verified',
    title: '100% Certified',
    sub: 'Global Organic Standards',
  },
  {
    icon: 'eco',
    title: 'Plastic Free',
    sub: 'Sustainable Packaging',
  },
  {
    icon: 'agriculture',
    title: 'Direct from Farmers',
    sub: 'Fair Trade Empowerment',
  },
  {
    icon: 'local_shipping',
    title: 'Express Delivery',
    sub: 'Same-Day in Metro Cities',
  },
];

export default function TrustBar() {
  return (
    <section className="reveal bg-surface-container-lowest border-b border-outline-variant/10 py-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-wrap justify-between gap-8">
        {badges.map((b) => (
          <div key={b.title} className="flex items-center gap-4 group cursor-default">
            <div className="w-12 h-12 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary transition-transform duration-300 group-hover:rotate-[15deg] group-hover:scale-110 shrink-0">
              <span className="material-symbols-outlined material-symbols-filled">{b.icon}</span>
            </div>
            <div>
              <p className="font-sans font-semibold text-title-md text-primary leading-tight">{b.title}</p>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">{b.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
