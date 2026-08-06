import { type FormEvent, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { site } from '../data/site';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="inner-page contact-page">
      <section className="inner-hero contact-hero" aria-labelledby="contact-heading">
        <div className="inner-hero-traces" aria-hidden="true" />
        <div className="container inner-hero-grid">
          <div>
            <p className="micro-label">CONTACT</p>
            <h1 id="contact-heading">Start a conversation.</h1>
          </div>
          <p>For students, faculty, and engineering teams interested in the work. Confirmed contact channels will be published before launch.</p>
        </div>
      </section>

      <section className="inquiry-section" aria-labelledby="inquiry-heading">
        <div className="container">
          <Reveal>
            <p className="micro-label maroon-text">WHO WE HEAR FROM</p>
            <h2 id="inquiry-heading">The right path in.</h2>
          </Reveal>
          <div className="inquiry-grid">
            {[
              ['Student inquiry', 'Membership, onboarding, technical areas, and meeting details.'],
              ['Faculty inquiry', 'Advising, coursework alignment, and research collaboration.'],
              ['Industry inquiry', 'Mentorship, tool access, technical talks, and project support.'],
            ].map(([title, copy], index) => (
              <Reveal key={title} delay={index * 80} className="inquiry-item">
                <span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form-section" aria-labelledby="message-heading">
        <div className="container contact-layout">
          <Reveal>
            <p className="micro-label maroon-text">MESSAGE</p>
            <h2 id="message-heading">Tell us what you’re working on.</h2>
            <p className="form-intro">This form is an interface preview. It does not transmit or store responses until a backend is connected.</p>

            {submitted ? (
              <div className="form-confirmation" role="status">
                <span>PREVIEW COMPLETE</span>
                <h3>The message flow is ready.</h3>
                <p>No message was sent. See the README to connect delivery.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Write another</button>
              </div>
            ) : (
              <form className="site-form" onSubmit={submit}>
                <div className="field-row">
                  <label><span>Name</span><input name="name" type="text" autoComplete="name" required /></label>
                  <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
                </div>
                <label><span>I’m reaching out as</span>
                  <select name="inquiryType" defaultValue="" required>
                    <option value="" disabled>Select one</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="industry">Company or sponsor</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <label><span>Message</span><textarea name="message" rows={6} required /></label>
                <button className="solid-button" type="submit">Preview message <span aria-hidden="true">↗</span></button>
              </form>
            )}
          </Reveal>

          <Reveal className="contact-direct" delay={100}>
            <p className="micro-label">DIRECT CHANNELS</p>
            <dl>
              <div><dt>General</dt><dd>{site.externalLinks.emailLabel}</dd></div>
              <div><dt>Code</dt><dd>{site.externalLinks.githubLabel}</dd></div>
              <div><dt>Community</dt><dd>{site.externalLinks.communityLabel}</dd></div>
              <div><dt>Campus</dt><dd>Texas A&amp;M University · College Station</dd></div>
            </dl>
            <div className="partner-panel">
              <span>PARTNER WITH REV SILICON</span>
              <h3>Bring industry context into the room.</h3>
              <p>We are interested in technical mentorship, talks, tool access, and project guidance. No sponsorship claims are implied.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
