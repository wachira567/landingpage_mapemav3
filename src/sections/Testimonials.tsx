import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

const QUOTES = [
  {
    text: "Mapema has completely changed how we handle employee perks. The airtime rewards program saw 90% adoption in the first month.",
    author: "Sarah Kimani",
    role: "HR Director, Nairobi FinTech Ltd",
  },
  {
    text: "As a small business owner, every shilling counts. Getting 4% back on airtime purchases adds up to real savings.",
    author: "James Ochieng",
    role: "Retail Shop Owner, Kisumu",
  },
  {
    text: "The API integration was seamless. We had our white-label rewards platform live within two weeks.",
    author: "David Mwangi",
    role: "CTO, PayStream Solutions",
  },
  {
    text: "Our agents love the instant commission structure. Mapema has become our most reliable disbursement partner.",
    author: "Grace Akinyi",
    role: "Operations Manager, Coastal Telecom",
  },
];

const BLOB_SHAPES = [
  "50% 50% 50% 50% / 50% 50% 50% 50%",
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 70% 30% / 40% 70% 30% 60%",
  "55% 45% 35% 65% / 45% 35% 65% 55%",
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [blobShape, setBlobShape] = useState(BLOB_SHAPES[0]);
  const textRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const autoAdvanceRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const showQuote = useCallback((index: number) => {
    if (isAnimating || !textRef.current || !authorRef.current) return;
    setIsAnimating(true);

    const quote = QUOTES[index];

    // Animate blob shape change
    setBlobShape(BLOB_SHAPES[index % BLOB_SHAPES.length]);

    // Exit animation
    gsap.to(textRef.current.children, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      stagger: 0.02,
      ease: 'power3.in',
      onComplete: () => {
        if (!textRef.current || !authorRef.current) return;

        // Split quote into words
        const words = quote.text.split(' ');
        textRef.current.innerHTML = words
          .map((word) => `<span style="display: inline-block; opacity: 0; transform: translateY(20px)">${word}&nbsp;</span>`)
          .join('');

        authorRef.current.style.opacity = '0';

        // Enter animation
        gsap.to(textRef.current.children, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.02,
          ease: 'power3.out',
        });

        gsap.to(authorRef.current, {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'power3.out',
          onComplete: () => {
            setIsAnimating(false);
          },
        });

        if (authorRef.current) {
          authorRef.current.innerHTML = `<strong>${quote.author}</strong><br/><span style="color: rgba(255,255,255,0.5)">${quote.role}</span>`;
        }
      },
    });
  }, [isAnimating]);

  // Auto-advance
  useEffect(() => {
    autoAdvanceRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % QUOTES.length;
        showQuote(next);
        return next;
      });
    }, 6000);

    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [showQuote]);

  const handlePrev = () => {
    if (isAnimating) return;
    const next = (currentIndex - 1 + QUOTES.length) % QUOTES.length;
    setCurrentIndex(next);
    showQuote(next);
  };

  const handleNext = () => {
    if (isAnimating) return;
    const next = (currentIndex + 1) % QUOTES.length;
    setCurrentIndex(next);
    showQuote(next);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      data-theme="dark"
      style={{
        background: '#050505',
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
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left column */}
          <div className="w-full lg:w-[40%]">
            <p
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#8b5cf6',
                marginBottom: '16px',
              }}
            >
              VOICES
            </p>
            <h2
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#ffffff',
              }}
            >
              Trusted Across Kenya
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px',
                lineHeight: 1.6,
                color: 'rgba(255,255,255,0.5)',
                marginTop: '16px',
              }}
            >
              From individual users to enterprise partners, hear how Mapema is transforming the way Kenyans think about everyday transactions.
            </p>
          </div>

          {/* Right column - Orb */}
          <div className="w-full lg:w-[60%] flex justify-center relative">
            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'color 0.3s ease',
                padding: '12px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'color 0.3s ease',
                padding: '12px',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              →
            </button>

            {/* The Orb */}
            <div
              style={{
                width: '280px',
                height: '280px',
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px) brightness(1.2) saturate(1.2)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '40px',
                boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.1), 0 20px 50px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                transition: 'border-radius 1.5s ease-in-out',
                borderRadius: blobShape.includes('%') ? blobShape.split(' / ')[0] as any : '50%',
              }}
            >
              <div
                ref={textRef}
                style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: '13px',
                  lineHeight: 1.6,
                  color: '#ffffff',
                  maxWidth: '200px',
                  minHeight: '120px',
                }}
              >
                {QUOTES[0].text.split(' ').map((word, i) => (
                  <span
                    key={i}
                    style={{ display: 'inline-block' }}
                  >
                    {word}{' '}
                  </span>
                ))}
              </div>
              <div
                ref={authorRef}
                style={{
                  marginTop: '20px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <strong>{QUOTES[0].author}</strong>
                <br />
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>{QUOTES[0].role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
