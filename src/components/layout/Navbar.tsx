import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToSection } from './SmoothScroller';
import { personal } from '../../data/portfolio';

const navItems = [
  { num: '001', label: 'HOME', id: 'home' },
  { num: '002', label: 'ABOUT', id: 'about' },
  { num: '003', label: 'EXPERIENCE', id: 'experience' },
  { num: '004', label: 'PROJECTS', id: 'projects' },
  { num: '005', label: 'CERTIFICATIONS', id: 'certifications' },
  { num: '006', label: 'EXTRA CURRICULARS', id: 'leadership' },
  { num: '007', label: 'CONTACT', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((item) => item.id);
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
      window.location.href = `/#${id}`;
      return;
    }
    setTimeout(() => scrollToSection(id), 50);
  };

  return (
    <>
      {/* ===== DESKTOP NAV ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        style={{
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          background: scrolled ? 'rgba(236,230,216,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="container-main flex items-center justify-between" style={{ paddingTop: 18, paddingBottom: 18 }}>

          {/* Logo — name */}
          <button
            onClick={() => handleNav('home')}
            style={{ cursor: 'none', border: 'none', background: 'none' }}
            aria-label="Go to top"
          >
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.25rem',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              transition: 'opacity 0.2s ease',
              display: 'block',
              lineHeight: 1.15,
            }}>
              AROH<br />MAURYA
            </span>
          </button>

          {/* Center nav pill */}
          <nav
            style={{
              border: '1px solid var(--border-subtle)',
              padding: '10px 20px',
            }}
            aria-label="Main navigation"
          >
            <ul className="flex items-center" style={{ gap: 16 }}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    style={{ cursor: 'none', border: 'none', background: 'none' }}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <span className="nav-num">{item.num}/</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resume and Writeups */}
          <div className="flex items-center" style={{ gap: 16 }}>
            <a
              href="/writeups.html"
              className="btn-outline"
              style={{ cursor: 'none' }}
              aria-label="View Writeups"
            >
              WRITEUPS
            </a>
            <a
              href={personal.resume}
              download
              className="btn-outline"
              style={{ cursor: 'none' }}
              aria-label="Download resume"
            >
              RESUME
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v6M2 5l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* ===== MOBILE NAV ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden"
        style={{
          background: 'rgba(236,230,216,0.96)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div className="container-main flex items-center justify-between" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <button
            onClick={() => handleNav('home')}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.95rem',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              lineHeight: 1,
              cursor: 'auto',
              border: 'none',
              background: 'none',
              color: 'var(--text-primary)',
            }}
          >
            AROH MAURYA
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ cursor: 'auto', border: '1px solid var(--border-subtle)', background: 'none', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span style={{ display: 'block', width: 22, height: 1, background: 'var(--text-primary)', transition: 'transform 0.3s ease', transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1, background: 'var(--text-primary)', transition: 'opacity 0.3s ease', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 1, background: 'var(--text-primary)', transition: 'transform 0.3s ease', transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav aria-label="Mobile navigation">
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.35 }}
                  >
                    <button
                      onClick={() => handleNav(item.id)}
                      style={{ cursor: 'auto', border: 'none', background: 'none', display: 'flex', alignItems: 'baseline', gap: '10px' }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em' }}>{item.num}</span>
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, color: 'var(--text-primary)' }}>{item.label}</span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div style={{ position: 'absolute', bottom: 40, left: 40, right: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <a href="/writeups.html" className="btn-outline" style={{ cursor: 'auto', width: '100%', justifyContent: 'center' }}>
                WRITEUPS
              </a>
              <a href={personal.resume} download className="btn-outline" style={{ cursor: 'auto', width: '100%', justifyContent: 'center' }}>
                DOWNLOAD RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
