import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '50K+', label: 'Active Members' },
  { value: 'KES 2M+', label: 'Rewards Paid' },
  { value: '4%', label: 'Max Cashback' },
  { value: '100+', label: 'Partner Services' },
];

export default function StatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: '#7c3aed',
        padding: '48px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
        className="lg:!grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="text-center relative"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s ease ${i * 0.15}s`,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 400,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '14px',
                color: 'rgba(255,255,255,0.75)',
                marginTop: '4px',
              }}
            >
              {stat.label}
            </div>
            {i < STATS.length - 1 && (
              <div
                className="hidden lg:block"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '20%',
                  width: '1px',
                  height: '60%',
                  background: 'rgba(255,255,255,0.25)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .lg\\:!grid-cols-4 {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
