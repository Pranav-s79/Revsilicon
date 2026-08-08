import { Reveal } from '../components/Reveal';
import { contact } from '../data/site';

const support = [
  {
    title: 'Access',
    detail: 'Give students the tools, compute, lab hardware, and fabrication access needed to build.',
  },
  {
    title: 'Experience',
    detail: 'Turn theory into practice through mentorship, design reviews, and industry-grade workflows.',
  },
  {
    title: 'Opportunity',
    detail: 'Help more students enter semiconductor careers with confidence and meaningful work behind them.',
  },
] as const;

const sharedValues = [
  ['Students first', 'Learning, ownership, and growth stay at the center of the partnership.'],
  ['Meaningful work', 'Support creates real engineering experiences, not passive exposure.'],
  ['Open doors', 'Mentorship and access make the semiconductor industry feel reachable.'],
] as const;

export default function SponsorPage() {
  return (
    <main id="main-content" className="inner-page sponsor-page">
      <section className="inner-hero sponsor-hero" aria-labelledby="sponsor-heading">
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label">PARTNER WITH REV SILICON</p>
            <h1 id="sponsor-heading">Sponsor hands-on chip design.</h1>
          </div>
          <p>
            We’re looking for organizations that believe students learn engineering by doing it. Your support gives Aggies
            access to tools, mentors, and real project experience.
          </p>
        </div>
      </section>

      <section className="support-section" aria-labelledby="support-heading">
        <div className="container">
          <Reveal className="support-intro">
            <p className="micro-label maroon-text">SHARED MISSION</p>
            <h2 id="support-heading">What your support unlocks.</h2>
          </Reveal>
          <div className="support-grid">
            {support.map((item, index) => (
              <Reveal key={item.title} delay={index * 80} className="support-item">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="partner-section" aria-labelledby="partner-heading">
        <div className="container partner-layout">
          <Reveal className="partner-copy">
            <p className="micro-label">A PARTNERSHIP WITH PURPOSE</p>
            <h2 id="partner-heading">Aligned on what matters.</h2>
            <dl className="partner-returns">
              {sharedValues.map(([title, detail]) => (
                <div key={title}>
                  <dt>{title}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="partner-contact" delay={110}>
            <p className="micro-label">SPONSOR REV SILICON</p>
            <h3>Build the next generation with us.</h3>
            <p>Tell us what your organization cares about. We’ll shape a partnership around the impact we can create together.</p>
            <a className="solid-button sponsor-button" href={`mailto:${contact.email}?subject=Sponsoring%20Rev%20Silicon`}>
              Start a partnership <span aria-hidden="true">↗</span>
            </a>
            <a className="sponsor-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
