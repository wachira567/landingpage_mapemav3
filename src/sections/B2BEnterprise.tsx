import { useScrollReveal } from '../hooks/useScrollReveal';

const B2B_CARDS = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7c3aed" strokeWidth="1.5">
        <rect x="8" y="16" width="32" height="26" rx="2" />
        <rect x="14" y="22" width="8" height="8" rx="1" />
        <rect x="26" y="22" width="8" height="8" rx="1" />
        <path d="M16 10h16M20 6h8" strokeLinecap="round" />
        <circle cx="36" cy="10" r="4" fill="#7c3aed" fillOpacity="0.15" />
        <path d="M35 10h2M36 9v2" stroke="#7c3aed" strokeWidth="1" />
      </svg>
    ),
    title: 'Employee Rewards',
    description: 'Offer airtime, data, and bill payment benefits as part of your employee wellness and retention strategy.',
    cta: 'Learn More',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7c3aed" strokeWidth="1.5">
        <circle cx="12" cy="24" r="5" />
        <circle cx="36" cy="12" r="5" />
        <circle cx="36" cy="36" r="5" />
        <path d="M16.5 21.5L31.5 14.5M16.5 26.5L31.5 33.5" />
      </svg>
    ),
    title: 'Loyalty API Integration',
    description: 'Plug our rewards engine into your existing app or platform. White-label solutions available for banks, telcos, and fintechs.',
    cta: 'View API Docs',
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#7c3aed" strokeWidth="1.5">
        <path d="M12 28c0-8 6-14 12-16 6 2 12 8 12 16v6H12v-6z" />
        <path d="M18 28c0-4 3-8 6-10 3 2 6 6 6 10" />
        <circle cx="24" cy="18" r="2" />
      </svg>
    ),
    title: 'Corporate Partnerships',
    description: 'Bulk airtime disbursement, commission-based agent networks, and co-branded rewards programs at enterprise scale.',
    cta: 'Contact Sales',
  },
];

export default function B2BEnterprise() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="business"
      data-theme="light"
      style={{
        background: '#ffffff',
        padding: '120px 20px',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="reveal-item text-center" style={{ maxWidth: '640px', margin: '0 auto' }}>
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
            FOR BUSINESSES
          </p>
          <h2
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#171717',
            }}
          >
            Reward Infrastructure for Your Company
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '18px',
              lineHeight: 1.6,
              color: '#525252',
              marginTop: '16px',
              maxWidth: '560px',
              margin: '16px auto 0',
            }}
          >
            Integrate Mapema's rewards engine into your employee benefits, customer loyalty programs, and corporate disbursements.
          </p>
        </div>

        {/* B2B Cards */}
        <div
          className="reveal-item"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '64px',
          }}
        >
          {B2B_CARDS.map((card) => (
            <div
              key={card.title}
              style={{
                background: '#f2f2f2',
                borderRadius: '24px',
                padding: '40px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              {card.icon}
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  color: '#171717',
                  marginTop: '24px',
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '16px',
                  lineHeight: 1.6,
                  color: '#525252',
                  marginTop: '12px',
                }}
              >
                {card.description}
              </p>
              <a
                href="#contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  color: '#7c3aed',
                  textDecoration: 'none',
                  marginTop: '24px',
                  transition: 'gap 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.gap = '10px';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.gap = '6px';
                }}
              >
                {card.cta} <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* B2B CTA Band */}
        <div
          className="reveal-item"
          style={{
            marginTop: '64px',
            background: '#050505',
            borderRadius: '24px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '28px',
                fontWeight: 700,
                color: '#ffffff',
              }}
            >
              Ready to power rewards at scale?
            </h3>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                color: '#d4d4d4',
                marginTop: '8px',
              }}
            >
              Talk to our enterprise team about custom solutions.
            </p>
          </div>
          <a href="#contact" className="pill-btn pill-btn-primary">
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}
