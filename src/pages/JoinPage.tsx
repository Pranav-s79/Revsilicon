import { type FormEvent, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { site } from '../data/site';
import { Link } from '../router';

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="inner-page join-page">
      <section className="inner-hero join-hero" aria-labelledby="join-heading">
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label maroon-text">JOIN REV SILICON</p>
            <h1 id="join-heading">Start where you are.</h1>
          </div>
          <p>Membership is open to every major and year. No chip-design experience is required—only the willingness to learn and contribute.</p>
        </div>
      </section>

      <section className="who-section">
        <div className="container who-grid">
          {[
            ['Curious beginners', 'Start with a guided task, foundational material, and a technical lead.'],
            ['Coursework-ready', 'Apply digital logic, architecture, or embedded systems to a shared design.'],
            ['Adjacent builders', 'Software, scripting, PCB, operations, and documentation are all load-bearing.'],
          ].map(([title, copy], index) => (
            <Reveal key={title} delay={index * 80} className="who-item">
              <span>{String(index + 1).padStart(2, '0')}</span><h2>{title}</h2><p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="onboarding-section" aria-labelledby="onboarding-heading">
        <div className="container onboarding-layout">
          <Reveal>
            <p className="micro-label maroon-text">ONBOARDING</p>
            <h2 id="onboarding-heading">A clear first contribution.</h2>
            <p>Onboarding is structured around the real project workflow, with enough context to make your first task useful.</p>
          </Reveal>
          <div className="onboarding-steps">
            {[
              ['Week 01', 'Meet the team, choose an area, and learn the project vocabulary.'],
              ['Week 02', 'Set up the toolchain and complete a guided technical exercise.'],
              ['Ongoing', 'Join a weekly work session and contribute through review.'],
              ['Term', 'Complete a documented project contribution with your name on it.'],
            ].map(([label, copy], index) => (
              <Reveal key={label} delay={index * 55} className="onboarding-step">
                <span>{label}</span><p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="form-section" aria-labelledby="interest-heading">
        <div className="container form-layout">
          <Reveal>
            <p className="micro-label maroon-text">INTEREST FORM</p>
            <h2 id="interest-heading">Tell us what you want to learn.</h2>
            <p className="form-intro">This preview does not transmit or store responses. Connect the form endpoint before launch.</p>

            {submitted ? (
              <div className="form-confirmation" role="status">
                <span>PREVIEW COMPLETE</span>
                <h3>Your form is ready for a backend.</h3>
                <p>No information was sent or stored. See the README for the connection point.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Edit response</button>
              </div>
            ) : (
              <form className="site-form" onSubmit={submit}>
                <div className="field-row">
                  <label><span>Name</span><input name="name" type="text" autoComplete="name" required /></label>
                  <label><span>Texas A&amp;M email</span><input name="email" type="email" autoComplete="email" placeholder="you@tamu.edu" required /></label>
                </div>
                <div className="field-row">
                  <label><span>Major</span><input name="major" type="text" required /></label>
                  <label><span>Graduation year</span><input name="graduationYear" type="text" inputMode="numeric" pattern="20[2-4][0-9]" placeholder="2028" required /></label>
                </div>
                <fieldset>
                  <legend>Areas of interest</legend>
                  <div className="choice-grid">
                    {site.interestAreas.map((area) => (
                      <label key={area} className="choice"><input type="checkbox" name="interests" value={area} /><span>{area}</span></label>
                    ))}
                  </div>
                </fieldset>
                <label><span>What do you want to learn?</span><textarea name="learningGoal" rows={4} required /></label>
                <label><span>GitHub or portfolio <em>Optional</em></span><input name="portfolio" type="url" inputMode="url" placeholder="https://" /></label>
                <button className="solid-button" type="submit">Preview submission <span aria-hidden="true">↗</span></button>
              </form>
            )}
          </Reveal>

          <Reveal className="form-aside" delay={100}>
            <p className="micro-label">PRACTICAL DETAILS</p>
            <dl>
              <div><dt>Meetings</dt><dd>Weekly schedule to be announced</dd></div>
              <div><dt>Location</dt><dd>Texas A&amp;M campus · room TBD</dd></div>
              <div><dt>Experience</dt><dd>No prior chip design required</dd></div>
              <div><dt>Commitment</dt><dd>One work session per week</dd></div>
            </dl>
            <p>Questions before you join?</p>
            <Link className="text-link light" to="/contact">Contact the team <span aria-hidden="true">↗</span></Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
