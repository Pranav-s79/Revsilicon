import { Reveal } from '../components/Reveal';
import { contact, site } from '../data/site';

export default function JoinPage() {
  return (
    <main id="main-content" className="inner-page join-page">
      <section className="apply-section" aria-labelledby="apply-heading">
        <div className="container apply-layout">
          <Reveal>
            <p className="micro-label">Timeline</p>
            <h1 id="apply-heading">Applications open each semester.</h1>
            <a className="apply-button" href={contact.applyForm} target="_blank" rel="noreferrer noopener">
              <span>Apply here</span>
              <span className="apply-arrow" aria-hidden="true">↗</span>
            </a>
          </Reveal>

          <Reveal className="apply-contact" delay={100}>
            <p className="micro-label">Questions?</p>
            <a className="apply-email" href={`mailto:${contact.email}`}>{contact.email}</a>
            <p>Ask what a week looks like, how to prepare, or where your interests fit.</p>
          </Reveal>
        </div>
      </section>

      <section className="teams-section" aria-labelledby="teams-heading">
        <div className="container">
          <Reveal className="teams-intro">
            <h2 id="teams-heading">Pick where you want to start.</h2>
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
    </main>
  );
}
