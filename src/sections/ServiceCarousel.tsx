import { useEffect, useRef, useState } from 'react';

const SERVICES = [
  { title: 'Airtime Purchase', icon: '📱', desc: 'Instant airtime for all networks' },
  { title: 'Data Bundles', icon: '📶', desc: 'Flexible data plans at great rates' },
  { title: 'Bill Payments', icon: '🧾', desc: 'Pay utilities, TV, and more' },
  { title: 'Cashback Rewards', icon: '💰', desc: 'Earn up to 4% on every purchase' },
  { title: 'Partner Services', icon: '🌐', desc: 'Access 100+ partner offers' },
];

export default function ServiceCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = 320;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="partners"
      data-theme="light"
      style={{
        background: '#ffffff',
        padding: '120px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease',
        }}
      >
        {/* Header */}
        <div className="text-center">
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#7c3aed',
              marginBottom: '16px',
            }}
          >
            OUR SERVICES
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: '#171717',
            }}
          >
            Everything You Need to Stay Connected
          </h2>
        </div>

        {/* Carousel */}
        <div style={{ marginTop: '64px', position: 'relative' }}>
          {/* Left arrow */}
          <button
            onClick={() => scroll('left')}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid #d4d4d4',
              background: '#ffffff',
              cursor: 'pointer',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: canScrollLeft ? 1 : 0.3,
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#171717" strokeWidth="1.5">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          {/* Cards container */}
          <div
            ref={scrollRef}
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              padding: '8px',
              msOverflowStyle: 'none',
            }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.title}
                style={{
                  minWidth: '280px',
                  scrollSnapAlign: 'start',
                  background: '#f2f2f2',
                  borderRadius: '24px',
                  padding: '40px 32px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  flex: '0 0 auto',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 12px 40px rgba(124,58,237,0.08)';
                  el.style.background = '#ede9fe';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                  el.style.background = '#f2f2f2';
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    marginBottom: '16px',
                  }}
                >
                  {service.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#171717',
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: '#525252',
                    marginTop: '8px',
                  }}
                >
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll('right')}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              border: '1px solid #d4d4d4',
              background: '#ffffff',
              cursor: 'pointer',
              zIndex: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: canScrollRight ? 1 : 0.3,
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#171717" strokeWidth="1.5">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        {/* Bottom text */}
        <div className="text-center" style={{ marginTop: '48px' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '16px',
              color: '#525252',
            }}
          >
            All services available via M-Pesa, web, and mobile app. 24/7 support.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: "'Space Mono', monospace",
              fontSize: '14px',
              color: '#7c3aed',
              textDecoration: 'none',
              marginTop: '16px',
              transition: 'gap 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.gap = '10px';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.gap = '6px';
            }}
          >
            View All Services <span>→</span>
          </a>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
