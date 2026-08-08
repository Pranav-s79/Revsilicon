import { Reveal } from '../components/Reveal';
import { logoMarkUrl } from '../assets';
import { site } from '../data/site';

export default function AboutPage() {
  return (
    <main id="main-content" className="inner-page about-page">
      <section className="inner-hero team-hero" aria-labelledby="about-heading">
        <div className="container team-hero-content">
          <p className="micro-label">CLUB LEADERSHIP</p>
          <h1 id="about-heading">The students leading Rev Silicon.</h1>
          <p>Student-led. Built together.</p>
        </div>
      </section>

      <section className="officers-section" aria-labelledby="officers-heading">
        <div className="container">
          <Reveal className="officers-intro">
            <div>
              <p className="micro-label maroon-text">OFFICERS</p>
              <h2 id="officers-heading">Meet the officers.</h2>
            </div>
            <p className="section-note">Profiles coming soon.</p>
          </Reveal>
          <div className="officer-grid">
            {site.officers.map((officer, index) => (
              <Reveal key={officer.role} delay={index * 70} className="officer-card">
                <span className="officer-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="portrait-placeholder" role="img" aria-label={`${officer.role} portrait to be published`}>
                  <img src={logoMarkUrl} alt="" />
                </div>
                <div className="officer-card-copy">
                  <h3>{officer.role}</h3>
                  <p>{officer.focus}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="org-section" aria-labelledby="org-heading">
        <div className="container">
          <Reveal className="team-structure-intro">
            <div>
              <p className="micro-label">HOW WE WORK</p>
              <h2 id="org-heading">One club. Two tracks.</h2>
            </div>
            <p>Architecture builds the chip. Operations builds the community.</p>
          </Reveal>

          <Reveal className="org-track-grid" delay={90}>
            {site.org.branches.map((branch, index) => (
              <article key={branch.title} className="org-track">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{branch.title}</h3>
                  <ul>
                    {branch.teams.map((team) => <li key={team}>{team}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
