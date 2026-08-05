import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../../data/portfolio';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  // Lock scroll when modal open
  React.useEffect(() => {
    document.body.style.overflow = activeProject ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [activeProject]);

  return (
    <section id="projects" className="section-base">
      <div className="container-main">
        <p className="label-mono" style={{ marginBottom: 16 }}>004 / PROJECTS</p>
        <div className="text-reveal-wrapper" style={{ overflow: 'hidden', marginBottom: 80 }}>
          <motion.h2
            className="heading-section"
            style={{ color: 'var(--text-primary)' }}
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            PROJECTS
          </motion.h2>
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => setActiveProject(project.id)}
              data-cursor-hover
              whileHover={{ backgroundColor: 'rgba(139,125,107,0.04)' }}
            >
              {/* Project number */}
              <p className="label-mono" style={{ marginBottom: 24 }}>
                {String(i + 1).padStart(2, '0')} / {project.category}
              </p>

              {/* Project name */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                lineHeight: 0.95,
                marginBottom: 16,
              }}>
                {project.name}
              </h3>

              {/* Tagline */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--accent)',
                lineHeight: 1.65,
                marginBottom: 32,
                fontWeight: 400,
                flexGrow: 1,
              }}>
                {project.tagline}
              </p>

              {/* Tech pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 32 }}>
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: '3px 10px',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      letterSpacing: '0.08em',
                      color: 'var(--accent)',
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span style={{
                    padding: '3px 10px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                  }}>
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* View arrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                }}>
                  VIEW PROJECT
                </span>
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="var(--text-primary)" strokeWidth="1" strokeLinecap="square"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <ProjectModal
        projectId={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
