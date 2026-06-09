export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="reveal py-section-gap bg-surface-container-lowest overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-stack-lg">
          {/* Image block */}
          <div className="lg:w-1/2 relative group w-full">
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrdGgq5IRokVMsyFRyMc6Qg9tDCh-Jrp137gAi2ZSHZwGiHqstsClbRlIWr4ik7_hUXAp7CDCrRgDIRcMNroFF1EHE9yFotQyMax4N3xN-daSMBWP-DOQJRog1X5FQY2xvp5cvSxkGZqUgmp2vJnH5dEVdhTXqMVheLsWIhuRbePSHzevEfQh_6eL79f4xCZGq6ODOW1TpBR0CWT37HIV4ipLQHrv8BibvOPcWh0DKlQZsK3Ex8groxLrZ3urgzQL412VsAe1BA4Y"
                alt="Portrait of an Indian organic farmer"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              {/* Floating stat card */}
              <div className="absolute bottom-5 right-5 bg-surface-container-lowest/90 backdrop-blur-md rounded-2xl p-4 shadow-organic flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined material-symbols-filled text-secondary text-[20px]">handshake</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-title-md text-primary leading-none">500+</p>
                  <p className="text-label-sm text-on-surface-variant">Farm Partners</p>
                </div>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-secondary-container/25 rounded-full -z-0 animate-pulse" />
            <div className="absolute -top-8 -left-8 w-36 h-36 bg-tertiary-fixed/25 rounded-full -z-0" style={{ animation: 'pulse 4s infinite' }} />
          </div>

          {/* Text block */}
          <div className="lg:w-1/2">
            <span className="text-secondary font-sans font-semibold text-label-sm uppercase tracking-widest mb-4 block">
              Our Conscience
            </span>
            <h2 className="font-serif text-headline-lg text-primary mb-stack-md leading-tight">
              Every harvest tells a story of revival and respect.
            </h2>
            <p className="font-sans text-body-lg text-on-surface-variant mb-8">
              We don't just sell organic produce; we partner with small-scale farmers across India to restore soil health and ensure fair livelihoods. Our plastic-free packaging is just the beginning of our journey toward a zero-waste future.
            </p>

            <div className="space-y-6 mb-stack-lg">
              {[
                {
                  icon: 'handshake',
                  title: 'Farm Partners',
                  desc: 'Supporting over 500+ indigenous families with fair trade pricing.',
                },
                {
                  icon: 'recycling',
                  title: 'Eco-Packaging',
                  desc: 'Compostable liners and reclaimed wood crates for every delivery.',
                },
                {
                  icon: 'water_drop',
                  title: 'Water Conservation',
                  desc: 'Our partners use 40% less water through drip irrigation methods.',
                },
              ].map(item => (
                <div key={item.title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined material-symbols-filled text-secondary text-[20px]">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-title-md text-primary">{item.title}</h4>
                    <p className="font-sans text-body-md text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="font-sans font-semibold text-primary border-b-2 border-secondary pb-1 hover:text-secondary hover:border-primary transition-all duration-200">
              Read Our Impact Report →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
