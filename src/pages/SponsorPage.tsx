import { Reveal } from '../components/Reveal';
import { contact } from '../data/site';

const support = [
  {
    title: 'Access',
    detail: 'Fund the software, compute, lab hardware, and fabrication runs that a student chip requires.',
  },
  {
    title: 'Experience',
    detail: 'Bring mentorship, design reviews, and industry workflows most students have never seen.',
  },
  {
    title: 'Opportunity',
    detail: 'Send more Aggies into semiconductor careers with real design work already behind them.',
  },
] as const;

export default function SponsorPage() {
  return (
    <main id="main-content" className="inner-page sponsor-page">
      <section className="inner-hero sponsor-hero" aria-labelledby="sponsor-heading">
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label">PARTNER WITH REV SILICON</p>
            <h1 id="sponsor-heading">Sponsor hands-on chip design</h1>
          </div>
          <p>
            We partner with organizations that believe engineers are made by building. We give Aggies the tools,
            mentors, and project experience to prove it.
          </p>
        </div>
      </section>

      <section className="support-section" aria-labelledby="support-heading">
        <div className="container">
          <Reveal className="support-intro">
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
          <Reveal className="partner-contact">
            <h2 id="partner-heading">Build the next generation with us.</h2>
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
