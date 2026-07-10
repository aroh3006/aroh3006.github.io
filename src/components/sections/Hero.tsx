import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { heroPrimary, heroSecondary, personal } from '../../data/portfolio';

export default function Hero() {
  const primaryRefs = useRef<HTMLDivElement[]>([]);
  const secondaryRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Stagger primary lines
    primaryRefs.current.forEach((el, i) => {
      if (el) setTimeout(() => el.classList.add('revealed'), 200 + i * 100);
    });
    // Stagger secondary lines after primary
    secondaryRefs.current.forEach((el, i) => {
      if (el) setTimeout(() => el.classList.add('revealed'), 550 + i * 90);
    });
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        paddingTop: 100,
        paddingBottom: 60,
      }}
    >
      <div className="container-main" style={{ width: '100%' }}>

        {/* Main editorial text block — max-width for comfortable reading */}
        <div style={{ maxWidth: 980, marginBottom: 40 }}>

          {/* Primary sentence */}
          <div style={{ marginBottom: 24 }}>
            {heroPrimary.map((line, i) => (
              <div key={i} className="text-reveal-wrapper">
                <h1
                  ref={(el) => { if (el) primaryRefs.current[i] = el; }}
                  className="text-reveal-inner heading-hero"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {line}
                </h1>
              </div>
            ))}
          </div>

          {/* Secondary sentence — slightly reduced size + muted */}
          <div>
            {heroSecondary.map((line, i) => (
              <div key={i} className="text-reveal-wrapper">
                <div
                  ref={(el) => { if (el) secondaryRefs.current[i] = el; }}
                  className="text-reveal-inner heading-hero"
                  style={{
                    color: 'var(--accent)',
                    fontSize: 'clamp(1.2rem, 2.4vw, 2.2rem)',
                  }}
                >
                  {line}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Identity + meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 32,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 40,
            alignItems: 'flex-start',
          }}
        >
          {/* Name block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <p className="label-mono" style={{ color: 'var(--accent)' }}>Portfolio</p>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
            }}>
              {personal.name}
            </p>
          </div>

          {/* Divider */}
          <div style={{ width: 1, height: 40, background: 'var(--border-subtle)', alignSelf: 'center' }} className="hidden md:block" />

          {/* Degree block */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <p className="label-mono" style={{ color: 'var(--accent)' }}>Degree</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 400 }}>
              {personal.title}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 300 }}>
              {personal.institution}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — right side */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        style={{
          position: 'absolute',
          right: 64,
          bottom: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
        className="hidden md:flex"
      >
        <div style={{ width: 1, height: 56, background: 'var(--border-subtle)' }} />
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          writingMode: 'vertical-rl',
        }}>
          SCROLL
        </p>
      </motion.div>
    </section>
  );
}
