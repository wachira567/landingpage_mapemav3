import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Business', href: '#business' },
  { label: 'Individuals', href: '#individuals' },
  { label: 'Partners', href: '#partners' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Check if we're over a dark section
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let overDark = false;
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom >= 80) {
          overDark = true;
        }
      });
      setIsDark(overDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '64px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          transition: 'all 0.4s ease',
          background: scrolled
            ? isDark
              ? 'rgba(5,5,5,0.85)'
              : 'rgba(255,255,255,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: isDark || !scrolled ? '#ffffff' : '#171717',
            textDecoration: 'none',
            transition: 'color 0.3s ease',
          }}
        >
          MAPEMA
        </a>

        {/* Desktop nav */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="nav-link"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: isDark || !scrolled ? 'rgba(255,255,255,0.6)' : '#525252',
                textDecoration: 'none',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = isDark || !scrolled ? '#ffffff' : '#171717';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = isDark || !scrolled ? 'rgba(255,255,255,0.6)' : '#525252';
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="pill-btn pill-btn-primary"
            style={{ padding: '10px 28px', fontSize: '13px' }}
          >
            Partner With Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '7px',
          }}
        >
          <span
            style={{
              width: '24px',
              height: '1.5px',
              background: isDark || !scrolled ? '#fff' : '#171717',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(45deg) translateY(4.25px)' : 'none',
            }}
          />
          <span
            style={{
              width: '24px',
              height: '1.5px',
              background: isDark || !scrolled ? '#fff' : '#171717',
              transition: 'all 0.3s',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-4.25px)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5,5,5,0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '32px',
                fontWeight: 700,
                color: '#ffffff',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="pill-btn pill-btn-primary"
            style={{ marginTop: '16px' }}
          >
            Partner With Us
          </a>
        </div>
      )}
    </>
  );
}
