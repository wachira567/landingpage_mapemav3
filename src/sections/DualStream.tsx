import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

const INDIVIDUAL_STEPS = [
  {
    num: '1',
    title: 'Buy Airtime or Data',
    desc: 'Use M-Pesa to purchase instantly.',
  },
  {
    num: '2',
    title: 'Earn Instantly',
    desc: 'Cashback credits to your account immediately.',
  },
  {
    num: '3',
    title: 'Redeem & Enjoy',
    desc: 'Use rewards for future purchases or partner services.',
  },
];

const BUSINESS_FEATURES = [
  'Bulk Airtime Disbursement',
  'White-Label Platform',
  'Real-Time Analytics',
  'Dedicated Account Manager',
];

export default function DualStream() {
  const [activeTab, setActiveTab] = useState<'individuals' | 'businesses'>('individuals');
  const individualPanelRef = useRef<HTMLDivElement>(null);
  const businessPanelRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (activeTab === 'individuals') {
      gsap.to(individualPanelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'all',
      });
      gsap.to(businessPanelRef.current, {
        opacity: 0,
        x: 30,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'none',
      });
    } else {
      gsap.to(businessPanelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'all',
      });
      gsap.to(individualPanelRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.5,
        ease: 'power3.out',
        pointerEvents: 'none',
      });
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="individuals"
      data-theme="light"
      style={{
        background: '#f2f2f2',
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
            TWO WAYS TO EARN
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
            Choose Your Path
          </h2>
        </div>

        {/* Toggle Switch */}
        <div
          className="flex justify-center"
          style={{ marginTop: '48px' }}
        >
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              background: 'rgba(0,0,0,0.08)',
              borderRadius: '100px',
              padding: '6px',
              cursor: 'pointer',
            }}
          >
            {/* Sliding indicator */}
            <div
              style={{
                position: 'absolute',
                top: '6px',
                left: activeTab === 'individuals' ? '6px' : '50%',
                width: 'calc(50% - 6px)',
                height: 'calc(100% - 12px)',
                background: '#7c3aed',
                borderRadius: '100px',
                transition: 'left 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 0,
              }}
            />
            <button
              onClick={() => setActiveTab('individuals')}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '12px 28px',
                borderRadius: '100px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'individuals' ? '#ffffff' : '#525252',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              For Individuals
            </button>
            <button
              onClick={() => setActiveTab('businesses')}
              style={{
                position: 'relative',
                zIndex: 1,
                padding: '12px 28px',
                borderRadius: '100px',
                fontFamily: "'Space Mono', monospace",
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                color: activeTab === 'businesses' ? '#ffffff' : '#525252',
                transition: 'color 0.3s ease',
                whiteSpace: 'nowrap',
              }}
            >
              For Businesses
            </button>
          </div>
        </div>

        {/* Panels */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '500px',
            marginTop: '48px',
            overflow: 'hidden',
          }}
        >
          {/* Panel A - Individuals */}
          <div
            ref={individualPanelRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: activeTab === 'individuals' ? 1 : 0,
              pointerEvents: activeTab === 'individuals' ? 'all' : 'none',
            }}
          >
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Left content */}
              <div className="w-full lg:w-1/2">
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#171717',
                    lineHeight: 1.2,
                  }}
                >
                  Earn on Every Purchase
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: '#525252',
                    marginTop: '16px',
                  }}
                >
                  Buy airtime and data via M-Pesa. Earn instant cashback up to 4%. Redeem for airtime, data, or partner services. No minimums. No hidden fees.
                </p>
                <div className="flex flex-col gap-4" style={{ marginTop: '24px' }}>
                  {INDIVIDUAL_STEPS.map((step) => (
                    <div key={step.num} className="flex items-start gap-4">
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#7c3aed',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Space Mono', monospace",
                            fontSize: '12px',
                            color: '#ffffff',
                            fontWeight: 700,
                          }}
                        >
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h4
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#171717',
                          }}
                        >
                          {step.title}
                        </h4>
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px',
                            color: '#525252',
                            marginTop: '2px',
                          }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="pill-btn pill-btn-dark"
                  style={{ marginTop: '32px', display: 'inline-flex' }}
                >
                  Get Started
                </a>
              </div>
              {/* Right image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src="/assets/illustration-mobile-app.jpg"
                  alt="Mapema mobile app showing M-Pesa payment and rewards"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Panel B - Businesses */}
          <div
            ref={businessPanelRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: activeTab === 'businesses' ? 1 : 0,
              pointerEvents: activeTab === 'businesses' ? 'all' : 'none',
              transform: 'translateX(30px)',
            }}
          >
            <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
              {/* Right content */}
              <div className="w-full lg:w-1/2">
                <h3
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#171717',
                    lineHeight: 1.2,
                  }}
                >
                  Enterprise-Grade Rewards
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: '#525252',
                    marginTop: '16px',
                  }}
                >
                  Deploy a complete rewards infrastructure for your organization. Bulk disbursements, real-time analytics, and dedicated account management.
                </p>
                <div className="flex flex-col gap-4" style={{ marginTop: '24px' }}>
                  {BUSINESS_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                        <circle cx="10" cy="10" r="10" fill="#7c3aed" fillOpacity="0.15" />
                        <path d="M6 10l3 3 5-5" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '16px',
                          color: '#171717',
                          fontWeight: 500,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="pill-btn pill-btn-primary"
                  style={{ marginTop: '32px', display: 'inline-flex' }}
                >
                  Partner With Us
                </a>
              </div>
              {/* Left image */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src="/assets/illustration-dashboard.jpg"
                  alt="Enterprise analytics dashboard"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
