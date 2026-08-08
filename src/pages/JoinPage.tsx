import { Reveal } from '../components/Reveal';
import { contact, site } from '../data/site';

export default function JoinPage() {
  return (
    <main id="main-content" className="inner-page join-page">
      <section className="inner-hero join-hero" aria-labelledby="join-heading">
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label">Join Rev Silicon</p>
            <h1 id="join-heading">Learn chip design by building it.</h1>
          </div>
          <p>
            Learn how silicon gets built, then help build it. All majors and experience levels are welcome.
          </p>
        </div>
      </section>

      <section className="teams-section" aria-labelledby="teams-heading">
        <div className="container">
          <Reveal className="teams-intro">
            <p className="micro-label maroon-text">The teams</p>
            <h2 id="teams-heading">Pick where you want to start.</h2>
            <p>Four teams, one project. Explore every stage, then go deep on one.</p>
          </Reveal>

          <div className="teams-grid">
            {site.teams.map((team, index) => (
              <Reveal key={team.title} delay={(index % 2) * 80} className="team-card">
                <p className="team-index">{String(index + 1).padStart(2, '0')}</p>
                <h3>{team.title}</h3>
                <p className="team-overview">{team.overview}</p>
                <p className="team-skills-label">Skills you build</p>
                <ul className="team-skills">
                  {team.skills.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="resources-strip">
            <div>
              <p className="micro-label maroon-text">Before you apply</p>
              <h3>Start with the fundamentals.</h3>
              <p>Our resource repository includes the tutorials, textbooks, and setup guides each team uses.</p>
            </div>
            <a className="text-link dark" href={contact.resources} target="_blank" rel="noreferrer noopener">
              Open the resource repo <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </section>

      <section className="apply-section" aria-labelledby="apply-heading">
        <div className="container apply-layout">
          <Reveal>
            <p className="micro-label">Applications</p>
            <h2 id="apply-heading">Applications open each semester.</h2>
            <p className="apply-note">
              The application form will appear here when available.
            </p>
            <button className="apply-button" type="button" disabled>
              <span>Apply here</span>
              <span className="apply-arrow" aria-hidden="true">↗</span>
            </button>
            <p className="apply-status">FORM OPENS FALL 2026</p>
          </Reveal>

          <Reveal className="apply-contact" delay={100}>
            <p className="micro-label">Questions?</p>
            <a className="apply-email" href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>Ask about weekly work, preparation, or where your interests fit.</p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
