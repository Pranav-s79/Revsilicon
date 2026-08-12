import { useEffect, useId, useRef, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { logoMarkUrl } from '../assets';
import { site } from '../data/site';
import type { Officer } from '../data/site';

function OfficerDialog({
  officer,
  titleId,
  onClose,
}: {
  officer: Officer;
  titleId: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const meta = officer.major
    ? `${officer.major}${officer.gradYear ? ` · Class of ${officer.gradYear}` : ''}`
    : null;

  return (
    <div className="officer-dialog-layer">
      <button className="officer-dialog-backdrop" type="button" aria-label="Close profile" onClick={onClose} />
      <article
        className="officer-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        tabIndex={-1}
      >
        <button className="officer-dialog-close" type="button" aria-label="Close profile" onClick={onClose}>
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="officer-dialog-media">
          <div className="officer-dialog-portrait">
            <img src={officer.photo ?? logoMarkUrl} alt="" className={officer.photo ? '' : 'is-placeholder'} />
          </div>
          <p className="micro-label maroon-text">{officer.role}</p>
          <h3 id={titleId}>{officer.name ?? officer.role}</h3>
        </div>

        <div className="officer-dialog-info">
          <div className="officer-dialog-field">
            <p className="micro-label">Major &amp; graduation</p>
            <p>{meta ?? 'Details coming soon.'}</p>
          </div>
          <div className="officer-dialog-field">
            <p className="micro-label">Bio</p>
            <p>{officer.bio ?? 'Profile coming soon, check back after officer elections wrap up.'}</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const cardRefs = useRef(new Map<number, HTMLButtonElement>());
  const titleId = useId();

  useEffect(() => {
    document.body.style.overflow = openIndex === null ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIndex]);

  const closeDialog = () => {
    const index = openIndex;
    setOpenIndex(null);
    if (index !== null) requestAnimationFrame(() => cardRefs.current.get(index)?.focus());
  };

  const openOfficer = site.officers[openIndex ?? -1];

  return (
    <main id="main-content" className="inner-page about-page">
      <section className="inner-hero team-hero" aria-labelledby="about-heading">
        <div className="container team-hero-content">
          <p className="micro-label">CLUB LEADERSHIP</p>
          <h1 id="about-heading">The students leading Rev Silicon.</h1>
        </div>
      </section>

      <section className="officers-section" aria-labelledby="officers-heading">
        <div className="container">
          <Reveal className="officers-intro">
            <div>
              <p className="micro-label maroon-text">OFFICERS</p>
              <h2 id="officers-heading">Meet the officers.</h2>
            </div>
            <p className="section-note">Click a card to meet them.</p>
          </Reveal>
          <div className="officer-grid">
            {site.officers.map((officer, index) => (
              <Reveal key={officer.role} delay={index * 70} className="officer-card-wrap">
                <button
                  type="button"
                  className="officer-card"
                  ref={(node) => {
                    if (node) cardRefs.current.set(index, node);
                    else cardRefs.current.delete(index);
                  }}
                  onClick={() => setOpenIndex(index)}
                  aria-haspopup="dialog"
                >
                  <span className="officer-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="officer-expand" aria-hidden="true">+</span>
                  <div className="portrait-placeholder" role="img" aria-label={`${officer.name ?? officer.role} portrait`}>
                    <img src={officer.photo ?? logoMarkUrl} alt="" className={officer.photo ? '' : 'is-placeholder'} />
                  </div>
                  <div className="officer-card-copy">
                    <h3>{officer.name ?? officer.role}</h3>
                    <p>{officer.name ? officer.role : 'Profile coming soon'}</p>
                    <span className="officer-view-hint">View profile <span aria-hidden="true">↗</span></span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {openOfficer ? (
        <OfficerDialog officer={openOfficer} titleId={titleId} onClose={closeDialog} />
      ) : null}
    </main>
  );
}
