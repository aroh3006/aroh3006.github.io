import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { certifications } from '../../data/portfolio';

export default function Certifications() {
  const [pdfViewer, setPdfViewer] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeCert = certifications.find((c) => c.id === pdfViewer);

  React.useEffect(() => {
    document.body.style.overflow = pdfViewer ? 'hidden' : '';
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPdfViewer(null); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [pdfViewer]);

  return (
    <section id="certifications" className="section-base">
      <div className="container-main">
        <p className="label-mono" style={{ marginBottom: 16 }}>005 / CERTIFICATES</p>
        <div className="text-reveal-wrapper" style={{ overflow: 'hidden', marginBottom: 80 }}>
          <motion.h2
            className="heading-section"
            style={{ color: 'var(--text-primary)' }}
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            CERTIFICATES
          </motion.h2>
        </div>

        <div
          ref={ref}
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: 24,
            paddingBottom: 32,
            scrollSnapType: 'x mandatory',
          }}
          className="hide-scrollbar"
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="cert-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              data-cursor-hover
              whileHover={{ backgroundColor: 'rgba(139,125,107,0.04)' }}
              style={{
                flex: '0 0 auto',
                width: 'min(420px, 85vw)',
                scrollSnapAlign: 'start',
                border: '1px solid var(--border-subtle)',
                padding: 48,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Abbreviation watermark */}
              <div style={{
                position: 'absolute',
                top: 48,
                right: 24,
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '4rem',
                color: 'var(--border-subtle)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                userSelect: 'none',
                opacity: 0.5,
              }}>
                {cert.abbreviation}
              </div>

              <p className="label-mono" style={{ marginBottom: 20, maxWidth: '60%', position: 'relative', zIndex: 1 }}>
                {cert.issuer} / {cert.year}
              </p>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                marginBottom: 16,
                maxWidth: '75%',
              }}>
                {cert.name}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                lineHeight: 1.75,
                color: 'var(--text-primary)',
                fontWeight: 400,
                marginBottom: 32,
                flex: 1,
              }}>
                {cert.description}
              </p>

              {/* Footer row */}
              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 'auto',
              }}>
                {cert.credentialId && (
                  <div>
                    <p className="label-mono" style={{ fontSize: '0.58rem', marginBottom: 4 }}>CREDENTIAL ID</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-primary)' }}>
                      {cert.credentialId}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
                  {cert.image && (
                    <>
                      {/* View inline */}
                      <button
                        onClick={() => setPdfViewer(cert.id)}
                        className="btn-outline"
                        style={{ cursor: 'none', padding: '8px 16px' }}
                        data-cursor-hover
                        aria-label={`View ${cert.name} certificate`}
                      >
                        VIEW ↗
                      </button>
                      {/* Download */}
                      <a
                        href={cert.image}
                        download
                        className="btn-outline"
                        style={{ cursor: 'none', padding: '8px 16px' }}
                        data-cursor-hover
                        aria-label={`Download ${cert.name} certificate`}
                      >
                        ↓
                      </a>
                    </>
                  )}
                  {!cert.image && (
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--border-subtle)',
                    }}>
                      PENDING
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {pdfViewer && activeCert && activeCert.image && (
          <>
            {/* Overlay */}
            <motion.div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(46,46,46,0.85)',
                zIndex: 300,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setPdfViewer(null)}
            />

            {/* PDF Panel */}
            <motion.div
              style={{
                position: 'fixed',
                top: '4vh',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'min(900px, 92vw)',
                height: '92vh',
                background: 'var(--bg-secondary)',
                zIndex: 301,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid var(--border-subtle)',
              }}
              initial={{ opacity: 0, y: 30, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 30, x: '-50%' }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            >
              {/* Header bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid var(--border-subtle)',
                flexShrink: 0,
              }}>
                <div>
                  <p className="label-mono" style={{ fontSize: '0.6rem' }}>{activeCert.issuer}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                    {activeCert.name}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <a
                    href={activeCert.image}
                    download
                    className="btn-outline"
                    style={{ cursor: 'none', padding: '8px 16px' }}
                    data-cursor-hover
                    aria-label="Download certificate"
                  >
                    DOWNLOAD ↓
                  </a>
                  <button
                    onClick={() => setPdfViewer(null)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border-subtle)',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'none',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1rem',
                      color: 'var(--text-primary)',
                      transition: 'background 0.2s ease',
                      flexShrink: 0,
                    }}
                    data-cursor-hover
                    aria-label="Close viewer"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* PDF iframe */}
              <iframe
                src={`${activeCert.image}#toolbar=1&navpanes=0`}
                title={`${activeCert.name} certificate`}
                style={{
                  width: '100%',
                  flex: 1,
                  border: 'none',
                  background: '#f5f5f0',
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
