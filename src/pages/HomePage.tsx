import { lazy, Suspense, type CSSProperties } from 'react';
import { FlickerGrid } from '../components/FlickerGrid';
import { MooreTimeline } from '../components/MooreTimeline';
import { Reveal } from '../components/Reveal';
import { SignalProcess } from '../components/SignalProcess';
import { site } from '../data/site';
import { Link } from '../router';

const HeroVisuals = lazy(() => import('../components/HeroVisuals'));

function HeroFallback() {
  return (
    <div className="hero-fallback" aria-hidden="true">
      <div className="fallback-board"><span /><span /><span /><span /></div>
    </div>
  );
}

function ComputeArrayVisual() {
  const tiles = Array.from({ length: 64 }, (_, index) => index);

  return (
    <div className="compute-array" aria-label="Abstract compute-array detail with repeated configurable tiles">
      <div className="compute-array-grid" aria-hidden="true">
        {tiles.map((index) => (
          <span
            key={index}
            className={(index + Math.floor(index / 8)) % 5 === 0 ? 'is-signal' : ''}
            style={{ '--tile-index': index } as CSSProperties}
          >
            <i /><i /><i /><i />
          </span>
        ))}
      </div>
      <div className="compute-array-die" aria-hidden="true">
        <span>OPEN</span>
        <strong>RISC-V</strong>
        <small>GPGPU</small>
      </div>
      <span className="array-via via-one" aria-hidden="true" />
      <span className="array-via via-two" aria-hidden="true" />
      <div className="array-legend" aria-hidden="true">
        <span>CONFIGURABLE CORES</span>
        <span>PARALLEL EXECUTION</span>
        <span>MEMORY PATHS</span>
      </div>
      <p className="array-note">COMPUTE ARRAY · CONCEPT VIEW · NOT A FINAL SPECIFICATION</p>
    </div>
  );
}

export function HomePage() {
  return (
    <main id="main-content" className="home-page">
      <section className="hero" aria-labelledby="home-heading">
        <div className="hero-visuals">
          <Suspense fallback={<HeroFallback />}>
            <HeroVisuals />
          </Suspense>
        </div>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-trace trace-left" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-trace trace-right" aria-hidden="true"><i /><i /></div>
        <div className="container hero-content">
          <p className="hero-kicker">TEXAS A&amp;M · STUDENT SEMICONDUCTOR TEAM</p>
          <h1 id="home-heading">
            <span className="hero-line"><span>From architecture</span></span>
            <span className="hero-line hero-line-accent"><span>to tapeout.</span></span>
          </h1>
          <p className="hero-subtitle">Students designing real silicon.</p>
          <p className="hero-support">Rev Silicon is a student-led team learning the complete path from chip architecture to fabricated hardware.</p>
          <div className="hero-actions">
            <Link className="text-link light" to="/join">Join Rev Silicon <span aria-hidden="true">↗</span></Link>
            <a className="text-link muted" href="#project">Explore the project <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-index" aria-hidden="true">
          <span>ACCELERATOR / CONCEPT 01</span>
          <span>DRAG TO ROTATE · DOUBLE-CLICK TO RESET</span>
        </div>
      </section>

      <section id="project" className="project-section" aria-labelledby="project-heading">
        <div className="container project-layout">
          <Reveal className="project-copy">
            <p className="micro-label maroon-text">{site.project.eyebrow}</p>
            <h2 id="project-heading">{site.project.title}</h2>
            <p>{site.project.description}</p>
            <dl className="project-attributes">
              {site.project.attributes.map((attribute, index) => (
                <div key={attribute}>
                  <dt>{String(index + 1).padStart(2, '0')}</dt>
                  <dd>{attribute}</dd>
                </div>
              ))}
            </dl>
            <Link className="text-link dark" to="/about">How the team works <span aria-hidden="true">↗</span></Link>
          </Reveal>
          <Reveal className="project-visual" delay={120}>
            <ComputeArrayVisual />
          </Reveal>
        </div>
      </section>

      <MooreTimeline />
      <SignalProcess />

      <section className="join-cta" aria-labelledby="join-cta-heading">
        <FlickerGrid />
        <div className="cta-glow" aria-hidden="true" />
        <Reveal className="join-cta-content">
          <div className="cta-logo-tile">
            <img src="/assets/logo-plate.png" alt="Rev Silicon logo" className="cta-mark" />
          </div>
          <p className="micro-label">THE NEXT SIGNAL STARTS HERE</p>
          <h2 id="join-cta-heading">Build silicon with us.</h2>
          <p>No prior chip-design experience required.</p>
          <Link className="outline-button" to="/join">Join Rev Silicon <span aria-hidden="true">↗</span></Link>
        </Reveal>
      </section>
    </main>
  );
}
