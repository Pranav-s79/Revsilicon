import { useState } from 'react';
import { site } from '../data/site';
import { Reveal } from './Reveal';

function stageAt(index: number) {
  const stage = site.process[index];
  if (!stage) throw new Error(`Missing process stage at index ${index}.`);
  return stage;
}

const stageVisualLabels = [
  ['SYSTEM MAP', 'INTERFACE CONTRACTS'],
  ['SYNTHESIZABLE LOGIC', 'CLOCKED BEHAVIOR'],
  ['COVERAGE MATRIX', 'REGRESSION STATUS'],
  ['FLOORPLAN', 'ROUTING CONGESTION'],
  ['MASK DATA', 'FINAL SIGNOFF'],
  ['LAB TRACE', 'FIRST SILICON'],
] as const;

function StageArtwork({ index }: { readonly index: number }) {
  const labels = stageVisualLabels[index];
  if (!labels) throw new Error(`Missing process artwork labels at index ${index}.`);

  const artwork = (() => {
    switch (index) {
      case 0:
        return (
          <g className="stage-artwork architecture-art">
            <rect className="art-frame" x="72" y="58" width="376" height="204" rx="2" />
            <rect className="art-block art-block-primary" x="196" y="106" width="128" height="108" />
            <rect className="art-block" x="92" y="82" width="70" height="54" />
            <rect className="art-block" x="92" y="184" width="70" height="54" />
            <rect className="art-block" x="358" y="82" width="70" height="54" />
            <rect className="art-block" x="358" y="184" width="70" height="54" />
            <path className="art-route" d="M162 109H196M162 211H196M324 109H358M324 211H358" />
            <path className="art-signal art-signal-a" d="M104 109H180V132H238" />
            <path className="art-signal art-signal-b" d="M416 211H342V188H282" />
            <text x="260" y="160">COMPUTE</text><text x="260" y="178">CLUSTER</text>
            <text x="127" y="113">HOST</text><text x="393" y="113">MEM</text>
            <text x="127" y="215">I/O</text><text x="393" y="215">FABRIC</text>
          </g>
        );
      case 1:
        return (
          <g className="stage-artwork rtl-art">
            <path className="art-baseline" d="M56 82H464M56 142H464M56 202H464M56 262H464" />
            <text x="58" y="69">CLK</text><text x="58" y="129">VALID</text><text x="58" y="189">DATA</text><text x="58" y="249">READY</text>
            <path className="art-wave" d="M118 82V58H164V106H210V58H256V106H302V58H348V106H394V58H442" />
            <path className="art-wave art-wave-delay" d="M118 166H186V118H278V166H370V118H442" />
            <path className="art-bus" d="M118 222L150 182H218L250 222L282 182H350L382 222L414 182H442" />
            <path className="art-wave art-wave-delay" d="M118 278H232V238H326V278H442" />
            <rect className="art-cursor" x="278" y="42" width="2" height="250" />
            <text className="art-readout" x="288" y="54">CYCLE 0184</text>
          </g>
        );
      case 2:
        return (
          <g className="stage-artwork verification-art">
            {Array.from({ length: 36 }, (_, cell) => {
              const column = cell % 9;
              const row = Math.floor(cell / 9);
              const isHot = (cell * 7) % 11 < 3;
              return <rect key={cell} className={isHot ? 'coverage-cell is-hot' : 'coverage-cell'} x={82 + column * 39} y={75 + row * 39} width="27" height="27" />;
            })}
            <path className="coverage-ring" d="M78 258H442" />
            <path className="coverage-progress" d="M78 258H386" />
            <circle cx="386" cy="258" r="7" />
            <text className="coverage-value" x="78" y="294">94.6%</text>
            <text className="art-readout" x="326" y="291">REGRESSION / PASS</text>
          </g>
        );
      case 3:
        return (
          <g className="stage-artwork physical-art">
            <rect className="die-outline" x="96" y="42" width="328" height="236" />
            <rect className="macro macro-a" x="116" y="62" width="94" height="72" />
            <rect className="macro macro-b" x="310" y="62" width="94" height="72" />
            <rect className="macro macro-c" x="116" y="190" width="94" height="68" />
            <rect className="macro macro-d" x="310" y="190" width="94" height="68" />
            <rect className="macro macro-core" x="228" y="91" width="64" height="136" />
            <path className="route-metal route-one" d="M104 155H416M260 50V270M162 134V190M358 134V190" />
            <path className="route-metal route-two" d="M104 168H416M247 50V270M210 98H310M210 222H310" />
            <circle className="route-via" cx="260" cy="161" r="8" />
            <text className="art-readout" x="112" y="298">CORE UTIL 68%</text><text className="art-readout" x="319" y="298">WNS +0.04</text>
          </g>
        );
      case 4:
        return (
          <g className="stage-artwork tapeout-art">
            <circle className="wafer-outline" cx="260" cy="157" r="118" />
            <path className="wafer-grid" d="M164 69V245M212 45V269M260 39V275M308 45V269M356 69V245M146 85H374M136 125H384M132 165H388M138 205H382M158 245H362" />
            <rect className="reticle" x="210" y="110" width="100" height="100" />
            <rect className="reticle-core" x="232" y="132" width="56" height="56" />
            <path className="art-scan" d="M178 92H342" />
            <text className="art-readout" x="72" y="294">GDSII / FINAL</text><text className="art-readout" x="344" y="294">DRC CLEAN</text>
          </g>
        );
      case 5:
        return (
          <g className="stage-artwork bringup-art">
            <rect className="scope-frame" x="62" y="52" width="396" height="214" />
            <path className="scope-grid" d="M62 105H458M62 159H458M62 213H458M128 52V266M194 52V266M260 52V266M326 52V266M392 52V266" />
            <path className="scope-trace" d="M74 188H112L128 175L144 201L162 82L178 225L196 164H236L250 151L264 177L282 99L298 213L316 164H354L368 151L382 177L400 106L416 208L434 164H448" />
            <circle className="scope-point" cx="282" cy="99" r="6" />
            <text className="scope-channel" x="76" y="76">CH1</text><text className="art-readout" x="354" y="286">1.00 GHz</text>
          </g>
        );
      default:
        throw new Error(`Missing process artwork at index ${index}.`);
    }
  })();

  return (
    <div className={`stage-art stage-art-${index}`} key={index}>
      <svg viewBox="0 0 520 320">{artwork}</svg>
      <div className="stage-art-meta">
        <span>{labels[0]}</span>
        <strong>{labels[1]}</strong>
      </div>
    </div>
  );
}

export function SignalProcess() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStage = stageAt(activeIndex);
  const nextStage = site.process[activeIndex + 1];
  const progress = (activeIndex / (site.process.length - 1)) * 100;

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => Math.max(0, Math.min(site.process.length - 1, current + direction)));
  };

  return (
    <section id="process" className="process-section" aria-labelledby="process-heading">
      <div className="process-grid-bg" aria-hidden="true" />
      <div className="container">
        <Reveal className="section-heading-row process-heading-row">
          <div>
            <p className="micro-label">The complete path</p>
            <h2 id="process-heading">Concept to silicon.</h2>
          </div>
          <p className="chart-unit">SIX STAGES · ONE CONTINUOUS SIGNAL</p>
        </Reveal>

        <Reveal delay={100} className="process-experience">
          <div className="process-rail" aria-label="Chip development stages">
            <div className="signal-line" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
            {site.process.map((stage, index) => (
              <button
                key={stage.title}
                type="button"
                className={index === activeIndex ? 'is-current' : index < activeIndex ? 'is-complete' : ''}
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
              >
                <span className="process-node" aria-hidden="true"><i /></span>
                <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{stage.title}</strong>
              </button>
            ))}
          </div>

          <div className="process-detail" key={activeStage.title} aria-live="polite">
            <div className="process-detail-index" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')}</div>
            <div className="process-detail-copy">
              <p className="micro-label">ACTIVE STAGE / {String(activeIndex + 1).padStart(2, '0')}</p>
              <h3>{activeStage.title}</h3>
              <p>{activeStage.description}</p>
              <dl>
                <div><dt>Output</dt><dd>{activeStage.output}</dd></div>
                <div><dt>Handoff</dt><dd>{activeStage.handoff}</dd></div>
              </dl>
              <div className="process-controls">
                <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} aria-label="Previous stage">←</button>
                <span>{activeIndex + 1} / {site.process.length}</span>
                <button type="button" onClick={() => move(1)} disabled={activeIndex === site.process.length - 1} aria-label="Next stage">→</button>
              </div>
            </div>

            <div className="process-signal-map" aria-hidden="true">
              <StageArtwork index={activeIndex} />
              <div className="signal-readout">
                <span>CURRENT HANDOFF</span>
                <strong>{nextStage ? `${activeStage.title} → ${nextStage.title}` : 'Bring-up → Revision'}</strong>
              </div>
              <span className="signal-status"><i /> SIGNAL ACTIVE</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
