import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Cursor from './components/layout/Cursor';
import { writeups } from './data/writeups';

function WriteupCard({ entry, index }: { entry: typeof writeups[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isClickable = entry.href !== '#';

  const cardContent = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="writeup-card"
      data-cursor-hover={isClickable ? true : undefined}
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        padding: '48px 0',
        display: 'grid',
        gridTemplateColumns: '100px 1fr 120px',
        gap: 24,
        alignItems: 'start',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 0.3s ease',
        cursor: isClickable ? 'none' : 'default',
      }}
    >
      {/* Date */}
      <p className="label-mono" style={{ paddingTop: 4, fontSize: '0.72rem' }}>
        {entry.date}
      </p>

      {/* Title + Description + Tags */}
      <div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          letterSpacing: '-0.01em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 12,
        }}>
          {entry.title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.7,
          color: 'var(--text-primary)',
          fontWeight: 400,
          marginBottom: 16,
          opacity: 0.75,
        }}>
          {entry.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {entry.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                border: '1px solid var(--border-subtle)',
                padding: '4px 10px',
                lineHeight: 1,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Read Time */}
      <p className="label-mono" style={{ textAlign: 'right', paddingTop: 4, fontSize: '0.68rem' }}>
        {entry.readTime}
      </p>
    </motion.div>
  );

  if (isClickable) {
    return (
      <a href={entry.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

function WriteupCardMobile({ entry, index }: { entry: typeof writeups[0]; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const isClickable = entry.href !== '#';

  const cardContent = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      className="writeup-card"
      style={{
        borderBottom: '1px solid var(--border-subtle)',
        padding: '32px 0',
        textDecoration: 'none',
        color: 'inherit',
        cursor: isClickable ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <p className="label-mono" style={{ fontSize: '0.68rem' }}>{entry.date}</p>
        <p className="label-mono" style={{ fontSize: '0.64rem' }}>{entry.readTime}</p>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: '1.15rem',
        letterSpacing: '-0.01em',
        textTransform: 'uppercase',
        color: 'var(--text-primary)',
        lineHeight: 1.2,
        marginBottom: 10,
      }}>
        {entry.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        lineHeight: 1.7,
        color: 'var(--text-primary)',
        fontWeight: 400,
        marginBottom: 14,
        opacity: 0.75,
      }}>
        {entry.description}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {entry.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.58rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              border: '1px solid var(--border-subtle)',
              padding: '3px 8px',
              lineHeight: 1,
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (isClickable) {
    return (
      <a href={entry.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        {cardContent}
      </a>
    );
  }

  return cardContent;
}

export default function WriteupsApp() {
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    document.documentElement.classList.add('lenis');
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      <Cursor />

      {/* Background textures */}
      <div className="paper-texture" />
      <div className="grid-bg" />

      <Navbar />

      <main style={{ minHeight: '100vh', paddingTop: 160, paddingBottom: 80, position: 'relative', zIndex: 1 }}>
        <div className="container-main">
          <p className="label-mono" style={{ marginBottom: 16 }}>SECURITY RESEARCH</p>
          <div className="text-reveal-wrapper" style={{ overflow: 'hidden', marginBottom: 80 }}>
            <h2
              className="heading-section"
              style={{ color: 'var(--text-primary)' }}
            >
              WRITEUPS
            </h2>
          </div>

          {/* Column headers — desktop only */}
          {!isMobile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '100px 1fr 120px',
              gap: 24,
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 16,
            }}>
              <p className="label-mono" style={{ fontSize: '0.6rem' }}>DATE</p>
              <p className="label-mono" style={{ fontSize: '0.6rem' }}>TITLE</p>
              <p className="label-mono" style={{ fontSize: '0.6rem', textAlign: 'right' }}>READ TIME</p>
            </div>
          )}

          {/* Writeup entries */}
          <div>
            {writeups.map((entry, i) =>
              isMobile
                ? <WriteupCardMobile key={entry.id} entry={entry} index={i} />
                : <WriteupCard key={entry.id} entry={entry} index={i} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
