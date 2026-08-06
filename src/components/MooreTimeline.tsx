import { useEffect, useMemo, useRef, useState } from 'react';
import { site } from '../data/site';

const VIEW_WIDTH = 1200;
const VIEW_HEIGHT = 590;
const PLOT = { left: 96, right: 1138, top: 68, bottom: 466 } as const;
const MIN_YEAR = 1968;
const MAX_YEAR = 2026;
const MIN_LOG = 3;
const MAX_LOG = 11.2;

type MilestoneKey = (typeof site.milestones)[number]['shortName'];

const labelOffsets: Record<MilestoneKey, { x: number; y: number; anchor: 'start' | 'middle' | 'end' }> = {
  '4004': { x: 0, y: -44, anchor: 'start' },
  '8086': { x: 4, y: 34, anchor: 'start' },
  Pentium: { x: -8, y: -48, anchor: 'end' },
  'GeForce 256': { x: 12, y: 50, anchor: 'start' },
  'Tesla V100': { x: -14, y: 52, anchor: 'end' },
  H100: { x: -10, y: -48, anchor: 'end' },
};

function getLabelOffset(shortName: string) {
  const offset = labelOffsets[shortName as MilestoneKey];
  if (!offset) throw new Error(`Missing chart label offset for ${shortName}.`);
  return offset;
}

function xForYear(year: number) {
  return PLOT.left + ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * (PLOT.right - PLOT.left);
}

function yForCount(count: number) {
  const logValue = Math.log10(count);
  return PLOT.bottom - ((logValue - MIN_LOG) / (MAX_LOG - MIN_LOG)) * (PLOT.bottom - PLOT.top);
}

function formatAxisCount(value: number) {
  const exponent = Math.log10(value);
  return `10^${exponent}`;
}

export function MooreTimeline() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const points = useMemo(
    () => site.milestones.map((milestone) => ({ ...milestone, x: xForYear(milestone.year), y: yForCount(milestone.transistors) })),
    [],
  );
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(2)} ${point.y.toFixed(2)}`).join(' ');
  const yTicks = [1_000, 100_000, 10_000_000, 1_000_000_000, 100_000_000_000] as const;
  const xTicks = [1970, 1980, 1990, 2000, 2010, 2020] as const;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.26 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={ref} className={`timeline-section ${visible ? 'is-visible' : ''}`} aria-labelledby="timeline-heading">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <p className="micro-label maroon-text">A scale of ambition</p>
            <h2 id="timeline-heading">Six milestones, then us.</h2>
          </div>
          <p className="chart-unit">TRANSISTORS PER CHIP · LOG SCALE</p>
        </div>

        <figure className="timeline-figure">
          <p className="chart-mobile-hint">Swipe to explore the complete series <span aria-hidden="true">→</span></p>
          <div className="chart-scroll" tabIndex={0} aria-label="Scrollable chart on smaller screens">
            <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} role="img" aria-labelledby="chart-title chart-description">
              <title id="chart-title">Transistor counts of six processor milestones from 1971 through 2022</title>
              <desc id="chart-description">
                A linear year axis and logarithmic transistor-count axis show the Intel 4004, Intel 8086, Intel Pentium,
                NVIDIA GeForce 256, NVIDIA Tesla V100, and NVIDIA H100. A separate 2026 marker denotes the beginning of Rev Silicon and is not a processor data point.
              </desc>

              <g className="chart-grid">
                {yTicks.map((tick) => {
                  const y = yForCount(tick);
                  return (
                    <g key={tick}>
                      <line x1={PLOT.left} y1={y} x2={PLOT.right} y2={y} />
                      <text x={PLOT.left - 18} y={y + 4} textAnchor="end">{formatAxisCount(tick)}</text>
                    </g>
                  );
                })}
                {xTicks.map((tick) => {
                  const x = xForYear(tick);
                  return (
                    <g key={tick}>
                      <line x1={x} y1={PLOT.top} x2={x} y2={PLOT.bottom} />
                      <text x={x} y={PLOT.bottom + 34} textAnchor="middle">{tick}</text>
                    </g>
                  );
                })}
              </g>

              <line className="chart-axis" x1={PLOT.left} y1={PLOT.bottom} x2={PLOT.right} y2={PLOT.bottom} />
              <line className="chart-axis" x1={PLOT.left} y1={PLOT.top} x2={PLOT.left} y2={PLOT.bottom} />
              <path className="chart-line-underlay" d={path} pathLength="1" />
              <path className="chart-line" d={path} pathLength="1" />

              <g className="chart-points">
                {points.map((point, index) => {
                  const offset = getLabelOffset(point.shortName);
                  return (
                    <g key={point.name} className="chart-point" style={{ '--point-index': index } as React.CSSProperties}>
                      <circle className="point-halo" cx={point.x} cy={point.y} r="11" />
                      <circle className="point-dot" cx={point.x} cy={point.y} r="5" />
                      <line
                        className="point-leader"
                        x1={point.x}
                        y1={point.y + Math.sign(offset.y) * 10}
                        x2={point.x + offset.x}
                        y2={point.y + offset.y - Math.sign(offset.y) * 14}
                      />
                      <text className="point-name" x={point.x + offset.x} y={point.y + offset.y} textAnchor={offset.anchor}>
                        {point.shortName}
                      </text>
                      <text className="point-count" x={point.x + offset.x} y={point.y + offset.y + 18} textAnchor={offset.anchor}>
                        {point.year} · {point.displayCount}
                      </text>
                    </g>
                  );
                })}
              </g>

              <g className="rev-marker">
                <line x1={xForYear(2026)} y1={PLOT.top - 14} x2={xForYear(2026)} y2={PLOT.bottom} />
                <rect x={xForYear(2026) - 151} y="238" width="140" height="56" />
                <text x={xForYear(2026) - 22} y="260" textAnchor="end">2026</text>
                <text className="rev-marker-title" x={xForYear(2026) - 22} y="279" textAnchor="end">REV SILICON BEGINS</text>
                <text className="rev-marker-note" x={xForYear(2026) - 22} y={PLOT.bottom + 34} textAnchor="end">ORGANIZATION · NOT A DEVICE</text>
              </g>
            </svg>
          </div>
          <figcaption>
            Historical device counts are isolated in <code>src/data/site.ts</code>. The 2026 marker records the organization’s entry into this story without assigning it a transistor count.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
