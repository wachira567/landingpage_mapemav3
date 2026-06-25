import { useRef, useEffect, useState } from 'react';

export default function ConversionFooter() {
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

  return (
    <>
      {/* Contact Section */}
      <section
        ref={sectionRef}
        id="contact"
        data-theme="dark"
        style={{
          background: '#7c3aed',
          padding: '120px 20px',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
        >
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Start Earning Today
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              marginTop: '16px',
            }}
          >
            Join 50,000+ Kenyans turning everyday purchases into real rewards. No signup fees. Instant activation.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap justify-center gap-4"
            style={{ marginTop: '48px' }}
          >
            <a
              href="mailto:help@mapema.co.ke"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 40px',
                borderRadius: '100px',
                background: '#ffffff',
                color: '#7c3aed',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = '#f2f2f2';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = '#ffffff';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              Create Free Account
            </a>
            <a
              href="mailto:sales@mapema.co.ke"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 40px',
                borderRadius: '100px',
                background: 'transparent',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = '#ffffff';
                el.style.background = 'rgba(255,255,255,0.1)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255,255,255,0.4)';
                el.style.background = 'transparent';
              }}
            >
              Contact Sales
            </a>
          </div>

          {/* Contact strip */}
          <div
            className="flex flex-wrap justify-center gap-8"
            style={{ marginTop: '80px' }}
          >
            {[
              { icon: '✉', text: 'help@mapema.co.ke' },
              { icon: '📞', text: '+254 724 151 515' },
              { icon: '📍', text: 'Westlands, Nairobi' },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2"
              >
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '13px',
                    color: '#ffffff',
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '48px 20px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Col 1 */}
            <div>
              <span
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                }}
              >
                MAPEMA
              </span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '8px',
                }}
              >
                Technology infrastructure for East Africa.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              {['Solutions', 'Network', 'About', 'Careers', 'Privacy', 'Terms'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              {['LinkedIn', 'Twitter', 'Contact'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.5)',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '11px',
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              © 2025 Mapema. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
