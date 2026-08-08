import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { prefersReducedMotion } from '../motion';

export function ProjectTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(prefersReducedMotion);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`phase-section ${visible ? 'is-visible' : ''}`}
      aria-labelledby="phase-heading"
    >
      <div className="container">
        <div className="phase-heading">
          <p className="micro-label">Project schedule</p>
          <h2 id="phase-heading">Architecture to tapeout.</h2>
          <p>One design, six phases, one academic year. Dates are targets. The shuttle deadline is not.</p>
        </div>

        <ol className="phase-rail">
          {site.projectPhases.map((phase, index) => (
            <li key={phase.title} className="phase" style={{ '--phase-index': index } as CSSProperties}>
              <p className="phase-window">{phase.window}</p>
              <span className="phase-node" aria-hidden="true"><i /></span>
              <h3>{phase.title}</h3>
              <p className="phase-detail">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
