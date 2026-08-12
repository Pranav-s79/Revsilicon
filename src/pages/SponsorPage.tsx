import { Reveal } from '../components/Reveal';
import { contact } from '../data/site';

const support = [
  {
    title: 'Access',
    detail: 'Fund the software, compute, lab hardware, and fabrication runs that a student chip requires.',
  },
  {
    title: 'Experience',
    detail: 'Bring mentorship, design reviews, and industry workflows to students learning them for the first time.',
  },
  {
    title: 'Opportunity',
    detail: 'Send more Aggies into semiconductor careers with real design work already behind them.',
  },
] as const;

const sharedValues = [
  ['Students first', 'What members learn and own stays at the center of the partnership.'],
  ['Meaningful work', 'Your support funds engineering that students actually do, not passive exposure.'],
  ['Open doors', 'Mentorship makes a semiconductor career feel within reach.'],
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
            We’re looking for partners who believe engineers are made by building, and who’ll give Aggies the tools,
            mentors, and project experience to do it.
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
            <p>Tell us what your organization cares about, and we’ll build the partnership around it.</p>
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
