import { type KeyboardEvent, useId, useRef, useState } from 'react';
import { markImageProps } from '../logoMark';
import { Reveal } from './Reveal';
import { site } from '../data/site';

/** Shared arrowhead. Marker ids are document-scoped, so this renders once. */
function StageDefs() {
  return (
    <svg className="stage-defs" aria-hidden="true" focusable="false">
      <defs>
        <marker id="stage-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path className="arrow-head" d="M0 0 L10 5 L0 10 Z" />
        </marker>
        <clipPath id="tapeout-die-window">
          <rect x="214" y="104" width="92" height="92" />
        </clipPath>
      </defs>
    </svg>
  );
}

function ArchitectureArt() {
  return (
    <g className="stage-art architecture-art">
      <rect className="blk" x="22" y="128" width="96" height="52" />
      <text x="70" y="159">HOST</text>

      <rect className="blk blk-key" x="168" y="118" width="118" height="72" />
      <text x="227" y="149">SCHEDULER</text>
      <text className="sub" x="227" y="169">DISPATCH</text>

      <rect className="blk" x="336" y="42" width="152" height="86" />
      <text x="412" y="80">COMPUTE</text>
      <text x="412" y="102">CORES</text>

      <rect className="blk" x="336" y="180" width="152" height="76" />
      <text x="412" y="212">MEMORY</text>
      <text className="sub" x="412" y="234">L1 / L2</text>

      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M118 154 H162" />
      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M286 140 H312 V85 H330" />
      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M286 168 H312 V218 H330" />
      <path className="wire wire-accent" pathLength={1} markerEnd="url(#stage-arrow)" markerStart="url(#stage-arrow)" d="M412 134 V174" />
    </g>
  );
}

function RtlArt() {
  return (
    <g className="stage-art rtl-art">
      <text className="sig" x="24" y="86">CLK</text>
      <text className="sig" x="24" y="156">VALID</text>
      <text className="sig" x="24" y="226">DATA</text>

      <path className="rail" d="M112 96 H500M112 166 H500M112 236 H500" />

      <path className="wave" pathLength={1} d="M112 96 H128 V64 H160 V96 H192 V64 H224 V96 H256 V64 H288 V96 H320 V64 H352 V96 H384 V64 H416 V96 H448 V64 H480 V96 H500" />
      <path className="wave wave-accent" pathLength={1} d="M112 166 H208 V134 H372 V166 H500" />

      <path className="bus" pathLength={1} d="M112 220 L128 204 H212 L228 220 L244 204 H356 L372 220 L388 204 H500" />
      <path className="bus" pathLength={1} d="M112 220 L128 236 H212 L228 220 L244 236 H356 L372 220 L388 236 H500" />
      <text className="cell" x="170" y="226">0x1A</text>
      <text className="cell" x="300" y="226">0x2B</text>
      <text className="cell" x="444" y="226">0x3C</text>

      <rect className="art-cursor" x="112" y="48" width="2" height="204" />
    </g>
  );
}

function VerificationArt() {
  return (
    <g className="stage-art verification-art">
      <rect className="blk" x="22" y="64" width="122" height="66" />
      <text x="83" y="94">STIMULUS</text>
      <text className="sub" x="83" y="114">RANDOM</text>

      <rect className="blk blk-key" x="202" y="52" width="120" height="90" />
      <text x="262" y="90">DUT</text>
      <text className="sub" x="262" y="112">RTL BLOCK</text>

      <rect className="blk" x="378" y="64" width="120" height="66" />
      <text x="438" y="94">CHECKER</text>
      <text className="sub" x="438" y="114">SCOREBOARD</text>

      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M144 97 H196" />
      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M322 97 H372" />
      <path className="wire wire-accent" pathLength={1} markerEnd="url(#stage-arrow)" d="M438 130 V166 H83 V136" />

      <text className="sig" x="22" y="222">FUNCTIONAL COVERAGE</text>
      <text className="sig val" x="498" y="222">94%</text>
      <rect className="meter-track" x="22" y="234" width="476" height="12" />
      <rect className="meter-fill" x="22" y="234" width="447" height="12" />
    </g>
  );
}

function SynthesisArt() {
  return (
    <g className="stage-art synthesis-art">
      <rect className="blk" x="22" y="72" width="140" height="136" />
      <path className="code-line" pathLength={1} d="M42 106 H142M42 130 H116M42 154 H150M42 178 H100" />
      <text className="caption" x="92" y="248">RTL SOURCE</text>

      <path className="wire" pathLength={1} markerEnd="url(#stage-arrow)" d="M170 140 H206" />

      <path className="gate" d="M246 80 H266 A16 16 0 0 1 266 112 H246 Z" />
      <path className="gate" d="M246 150 H266 A16 16 0 0 1 266 182 H246 Z" />
      <path className="gate gate-key" d="M318 113 Q333 131 318 149 Q345 149 362 131 Q345 113 318 113 Z" />
      <rect className="gate" x="404" y="104" width="56" height="56" />
      <path className="gate-clk" d="M404 148 L414 141 L404 134" />
      <text className="pin" x="414" y="126">D</text>
      <text className="pin end" x="450" y="126">Q</text>

      <path className="wire thin" pathLength={1} d="M214 88 H246M214 104 H246M214 158 H246M214 174 H246" />
      <path className="wire thin" pathLength={1} d="M282 96 H300 V123 H318M282 166 H300 V139 H318M362 131 H404M460 131 H498" />
      <text className="caption" x="356" y="248">GATE-LEVEL NETLIST</text>
    </g>
  );
}

const padPositions = (from: number, to: number, count: number) =>
  Array.from({ length: count }, (_, index) => from + ((to - from) * (index + 0.5)) / count);

function PhysicalArt() {
  const topPads = padPositions(40, 480, 13);
  const sidePads = padPositions(42, 232, 6);

  return (
    <g className="stage-art physical-art">
      <rect className="die" x="28" y="30" width="464" height="214" />
      {topPads.map((x) => (
        <g key={`h-${x}`}>
          <rect className="pad" x={x - 6} y="34" width="12" height="8" />
          <rect className="pad" x={x - 6} y="232" width="12" height="8" />
        </g>
      ))}
      {sidePads.map((y) => (
        <g key={`v-${y}`}>
          <rect className="pad" x="32" y={y - 6} width="8" height="12" />
          <rect className="pad" x="480" y={y - 6} width="8" height="12" />
        </g>
      ))}

      <rect className="core" x="60" y="60" width="400" height="154" />
      <rect className="pdn" x="70" y="70" width="380" height="134" />

      <rect className="macro" x="86" y="84" width="104" height="52" />
      <text x="138" y="115">SRAM</text>
      <rect className="macro" x="330" y="84" width="104" height="52" />
      <text x="382" y="115">SRAM</text>

      <path
        className="cell-row"
        pathLength={1}
        d={[
          ...[86, 97, 108, 119, 130].map((y) => `M204 ${y} H316`),
          ...[152, 163, 174, 185].map((y) => `M86 ${y} H434`),
        ].join('')}
      />

      <text className="caption start" x="28" y="272">I/O PADS</text>
      <text className="caption" x="260" y="272">POWER RING</text>
      <text className="caption end" x="492" y="272">STD-CELL ROWS</text>
    </g>
  );
}

const PKG = { x: 180, y: 70, size: 160 } as const;
const DIE = { x: 214, y: 104, size: 92 } as const;

function TapeoutArt() {
  const offsets = [24, 52, 80, 108, 136];
  const long = [52, 108];

  return (
    <g className="stage-art tapeout-art">
      {offsets.map((offset) => (
        <g key={offset} className="pkg-pin">
          <line x1={PKG.x - 22} y1={PKG.y + offset} x2={PKG.x} y2={PKG.y + offset} />
          <line x1={PKG.x + PKG.size} y1={PKG.y + offset} x2={PKG.x + PKG.size + 22} y2={PKG.y + offset} />
          <line x1={PKG.x + offset} y1={PKG.y - 22} x2={PKG.x + offset} y2={PKG.y} />
          <line x1={PKG.x + offset} y1={PKG.y + PKG.size} x2={PKG.x + offset} y2={PKG.y + PKG.size + 22} />
        </g>
      ))}
      {long.map((offset) => (
        <g key={`long-${offset}`} className="pkg-trace">
          <path pathLength={1} d={`M${PKG.x - 22} ${PKG.y + offset} H${PKG.x - 58} V${offset < 80 ? 46 : 254}`} />
          <path pathLength={1} d={`M${PKG.x + PKG.size + 22} ${PKG.y + offset} H${PKG.x + PKG.size + 58} V${offset < 80 ? 46 : 254}`} />
          <circle cx={PKG.x - 58} cy={offset < 80 ? 46 : 254} r="6" />
          <circle cx={PKG.x + PKG.size + 58} cy={offset < 80 ? 46 : 254} r="6" />
        </g>
      ))}

      <rect className="pkg-body" x={PKG.x} y={PKG.y} width={PKG.size} height={PKG.size} />
      <rect className="pkg-inset" x={PKG.x + 12} y={PKG.y + 12} width={PKG.size - 24} height={PKG.size - 24} />
      <rect className="pkg-die" x={DIE.x} y={DIE.y} width={DIE.size} height={DIE.size} />
      <image clipPath="url(#tapeout-die-window)" {...markImageProps(DIE)} preserveAspectRatio="xMidYMid slice" />
      <rect className="pkg-die-edge" x={DIE.x} y={DIE.y} width={DIE.size} height={DIE.size} />
      <rect className="art-scan" x={PKG.x} y={PKG.y} width={PKG.size} height="2" />

      <text className="caption" x="260" y="278">DRC · LVS · STA CLEAN → GDSII</text>
    </g>
  );
}

const artwork = [ArchitectureArt, RtlArt, VerificationArt, SynthesisArt, PhysicalArt, TapeoutArt] as const;
const stageCount = site.process.length;

const arrowKeys: Record<string, -1 | 1> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export function ProcessFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef(new Map<number, HTMLButtonElement>());
  const baseId = useId();

  const stage = site.process[activeIndex];
  const Art = artwork[activeIndex];
  if (!stage || !Art) throw new Error(`Missing process stage or artwork at index ${activeIndex}.`);

  const progress = (activeIndex / (stageCount - 1)) * 100;
  const atStart = activeIndex === 0;
  const atEnd = activeIndex === stageCount - 1;

  const select = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) tabRefs.current.get(index)?.focus();
  };

  /**
   * The step controls stay enabled at the ends and no-op instead. A disabled
   * button drops keyboard focus to the body the moment it is pressed.
   */
  const step = (delta: -1 | 1) => {
    const next = activeIndex + delta;
    if (next < 0 || next >= stageCount) return;
    setActiveIndex(next);
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = arrowKeys[event.key];
    if (delta) {
      event.preventDefault();
      select((activeIndex + delta + stageCount) % stageCount, true);
      return;
    }
    if (event.key === 'Home') {
      event.preventDefault();
      select(0, true);
    }
    if (event.key === 'End') {
      event.preventDefault();
      select(stageCount - 1, true);
    }
  };

  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <StageDefs />
      <div className="container">
        <Reveal className="process-heading">
          <p className="micro-label">The complete path</p>
          <h2 id="process-heading">Concept to silicon.</h2>
          <p>Six stages, from architecture through tapeout.</p>
        </Reveal>

        <Reveal delay={90} className="process-experience">
          <div className="process-rail" role="tablist" aria-label="Chip design stages">
            <span className="signal-line" aria-hidden="true">
              <span style={{ width: `${progress}%` }} />
            </span>
            {site.process.map((item, index) => (
              <button
                key={item.title}
                id={`${baseId}-tab-${index}`}
                ref={(node) => {
                  if (node) tabRefs.current.set(index, node);
                  else tabRefs.current.delete(index);
                }}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-controls={`${baseId}-panel`}
                tabIndex={index === activeIndex ? 0 : -1}
                className={index === activeIndex ? 'is-current' : index < activeIndex ? 'is-complete' : ''}
                onClick={() => select(index)}
                onKeyDown={onTabKeyDown}
              >
                <span className="process-node" aria-hidden="true"><i /></span>
                <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>

          <div
            className="process-detail"
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${activeIndex}`}
          >
            <div className="process-detail-copy">
              <div className="process-detail-text" key={activeIndex}>
                <p className="micro-label">Stage {activeIndex + 1} of {stageCount}</p>
                <h3>{stage.title}</h3>
                <p>{stage.summary}</p>
              </div>
              <div className="process-controls">
                <button
                  type="button"
                  aria-disabled={atStart}
                  aria-label="Previous stage"
                  onClick={() => step(-1)}
                >
                  ←
                </button>
                <span>{activeIndex + 1} / {stageCount}</span>
                <button
                  type="button"
                  aria-disabled={atEnd}
                  aria-label="Next stage"
                  onClick={() => step(1)}
                >
                  →
                </button>
              </div>
            </div>

            <div className="process-stage-art" key={activeIndex}>
              <svg viewBox="0 0 520 300" role="img" aria-label={`${stage.title} diagram`}>
                <Art />
              </svg>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
