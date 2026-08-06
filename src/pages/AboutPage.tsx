import { Reveal } from '../components/Reveal';
import { site } from '../data/site';
import { Link } from '../router';

export default function AboutPage() {
  return (
    <main id="main-content" className="inner-page about-page">
      <section className="inner-hero about-hero" aria-labelledby="about-heading">
        <div className="inner-hero-traces" aria-hidden="true" />
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label">ABOUT REV SILICON</p>
            <h1 id="about-heading">Learning the whole chip, together.</h1>
          </div>
          <p>{site.shortDescription} Members work across the handoffs that turn an idea into testable hardware.</p>
        </div>
      </section>

      <section className="belief-section">
        <div className="container">
          <Reveal className="belief-heading">
            <p className="micro-label maroon-text">WHY END TO END</p>
            <h2>A chip is a group deliverable.</h2>
          </Reveal>
          <div className="belief-grid">
            {[
              ['01', 'Architecture only matters when the implementation can carry it.'],
              ['02', 'Verification and physical design shape decisions from the beginning.'],
              ['03', 'Clean interfaces and reproducible tools make student work compound.'],
            ].map(([number, text], index) => (
              <Reveal key={number} delay={index * 80} className="belief-item">
                <span>{number}</span><p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="areas-section" aria-labelledby="areas-heading">
        <div className="container">
          <Reveal>
            <p className="micro-label maroon-text">TECHNICAL AREAS</p>
            <h2 id="areas-heading">Six disciplines. One shared design.</h2>
          </Reveal>
          <div className="areas-grid">
            {site.areas.map((area, index) => (
              <Reveal key={area.title} delay={(index % 3) * 70} className="area-item">
                <span>D-{String(index + 1).padStart(2, '0')}</span>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="structure-section" aria-labelledby="structure-heading">
        <div className="container structure-layout">
          <Reveal>
            <p className="micro-label maroon-text">ORGANIZATION</p>
            <h2 id="structure-heading">Student-run. Faculty-advised.</h2>
            <p>An officer board maintains the program and toolchain. Technical leads run focused work sessions. Members contribute to a shared project through reviewed assignments.</p>
          </Reveal>
          <Reveal className="org-chart" delay={100}>
            <div className="org-node advisor">Faculty advisor</div>
            <span className="org-line" />
            <div className="org-node board">Officer board</div>
            <span className="org-line" />
            <div className="org-branches">
              <span>Technical leads</span><span>Project lead</span><span>Outreach</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="officers-section" aria-labelledby="officers-heading">
        <div className="container">
          <Reveal>
            <p className="micro-label maroon-text">LEADERSHIP</p>
            <h2 id="officers-heading">Founding team.</h2>
            <p className="section-note">Names and portraits will be published after the officer roster is confirmed.</p>
          </Reveal>
          <div className="officer-grid">
            {site.officerRoles.map((role, index) => (
              <Reveal key={role} delay={index * 70} className="officer-card">
                <div className="portrait-placeholder" aria-label={`${role} portrait to be published`}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <img src="/assets/logo-mark.png" alt="" />
                </div>
                <p>{role}</p>
                <span>ROSTER FORTHCOMING</span>
              </Reveal>
            ))}
          </div>
          <Reveal className="about-join-link">
            <p>Interested in becoming part of the founding team?</p>
            <Link className="text-link dark" to="/join">See how to join <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
