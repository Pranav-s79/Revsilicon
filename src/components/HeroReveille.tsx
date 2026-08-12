import { useEffect, useRef } from 'react';
import { dogRunCycleUrl } from '../assets';
import { prefersReducedMotion } from '../motion';

const ROW_STEP = 13;
/** One traverse of the hero, off-screen left to off-screen right. */
const TRAVERSE_SECONDS = 5.4;
const FRAME_COLUMNS = 4;
const FRAME_COUNT = 8;
const FRAME_WIDTH = 384;
const FRAME_HEIGHT = 320;
/** Ground covered by one eight-cell stride, as a fraction of the runner's drawn width. */
const STRIDE_REACH = 0.9;
/** Cells per rise-and-fall of the body. The sheet extends on cells 3 and 7. */
const CELLS_PER_BOUND = 4;
/**
 * Opacity ceiling for the runner. The maroon body is nearly the colour of the hero
 * gradient, so the white markings carry the silhouette. Much below this and it stops
 * reading as a dog at all.
 */
const RUNNER_ALPHA = 0.66;
/** Share of a cell's travel used to separate the dissolved pair into motion blur. */
const BLUR_REACH = 0.4;

/** One pass of the signal field. Lanes alternate direction and never settle. */
function paintField(target: CanvasRenderingContext2D, width: number, height: number, seconds: number) {
  target.lineCap = 'butt';
  let lane = 0;
  for (let y = ROW_STEP * 0.5; y < height + ROW_STEP; y += ROW_STEP, lane += 1) {
    const phase = lane % 7;
    const dash = 24 + phase * 12;
    const gap = 40 + ((lane * 17) % 46);
    const drift = 22 + phase * 8;
    const direction = lane % 2 === 0 ? 1 : -1;
    const accent = lane % 9 === 4;

    target.setLineDash([dash, gap]);
    target.lineDashOffset = -direction * seconds * drift;
    target.lineWidth = 1;
    target.strokeStyle = accent ? 'rgba(217, 116, 126, 0.14)' : 'rgba(241, 231, 222, 0.065)';
    target.beginPath();
    target.moveTo(-60, y);
    target.lineTo(width + 60, y);
    target.stroke();
  }
  target.setLineDash([]);
}

function drawCell(
  target: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  cell: number,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
) {
  const sourceX = (cell % FRAME_COLUMNS) * FRAME_WIDTH;
  const sourceY = Math.floor(cell / FRAME_COLUMNS) * FRAME_HEIGHT;
  target.drawImage(
    sprite,
    sourceX,
    sourceY,
    FRAME_WIDTH,
    FRAME_HEIGHT,
    centerX - width / 2,
    centerY - height / 2,
    width,
    height,
  );
}

function smoothStep(value: number) {
  const clamped = Math.min(1, Math.max(0, value));
  return clamped * clamped * (3 - 2 * clamped);
}

/**
 * Weight handed to the next cell across a seam. The window is deliberately narrow: eight
 * hard-edged poses cross-dissolved for long enough read as two stacked dogs, so each cell
 * holds crisp and the hand-off lands in a frame or two of blur.
 */
function seamBlend(offset: number) {
  return smoothStep((offset - 0.34) / 0.32);
}

export function HeroReveille() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = prefersReducedMotion();
    const sprite = new Image();
    let loaded = false;
    let failed = false;
    let animationFrame = 0;
    let lastPaint = 0;

    const draw = (time: number) => {
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);
      const pixelWidth = Math.floor(width * ratio);
      const pixelHeight = Math.floor(height * ratio);

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      const seconds = reduceMotion ? 6.12 : time / 1000;
      paintField(context, width, height, seconds);
      if (!loaded) return;

      const narrow = width < 900;
      const runnerWidth = narrow ? Math.min(width * 0.74, height * 0.6) : Math.min(width * 0.46, height * 0.88);
      const runnerHeight = runnerWidth * (FRAME_HEIGHT / FRAME_WIDTH);
      const startX = -runnerWidth * 0.58;
      const endX = width + runnerWidth * 0.58;
      const travel = endX - startX;

      const traverse = reduceMotion ? 0.74 : (seconds % TRAVERSE_SECONDS) / TRAVERSE_SECONDS;
      const centerX = startX + travel * traverse;

      // Cadence is derived from ground speed, so the legs churn at the rate the body moves.
      const strideCount = Math.max(1, travel / Math.max(runnerWidth * STRIDE_REACH, 1));
      const cellPosition = reduceMotion ? 3 : traverse * strideCount * FRAME_COUNT;
      const cellIndex = Math.floor(cellPosition);
      const cellOffset = cellPosition - cellIndex;
      const blend = seamBlend(cellOffset);
      const trailingCell = ((cellIndex % FRAME_COUNT) + FRAME_COUNT) % FRAME_COUNT;
      const leadingCell = (trailingCell + 1) % FRAME_COUNT;

      // Suspension peaks on the extended cells and bottoms out on the gathered ones.
      const boundPhase = ((cellPosition - 1) / CELLS_PER_BOUND) * Math.PI * 2;
      const bound = 0.5 - 0.5 * Math.cos(boundPhase);
      const bodyAngle = -0.052 * Math.sin(boundPhase);

      const baseCenterY = height * (narrow ? 0.74 : 0.62);
      const centerY =
        baseCenterY
        - bound * height * (narrow ? 0.055 : 0.07)
        - Math.sin(traverse * Math.PI) * height * (narrow ? 0.03 : 0.05);
      // `.hero::after` already veils the copy column, so this only has to soften the
      // runner there rather than erase it for half the loop.
      const copyZoneFade = narrow
        ? 1
        : Math.max(0.34, smoothStep((centerX - width * 0.38) / (width * 0.14)));

      context.save();
      context.globalAlpha = (0.06 + copyZoneFade * 0.1) * (1 - bound * 0.55);
      context.fillStyle = '#160005';
      context.beginPath();
      context.ellipse(
        centerX,
        baseCenterY + runnerHeight * 0.38,
        runnerWidth * 0.26 * (1 - bound * 0.3),
        runnerHeight * 0.026,
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.restore();

      // The pair straddles the seam in space as well as in time, which reads as blur
      // rather than as two stacked dogs.
      const cellAdvance = travel / (strideCount * FRAME_COUNT);
      const opacity = RUNNER_ALPHA * copyZoneFade;

      context.save();
      context.shadowColor = 'rgba(255, 218, 221, 0.16)';
      context.shadowBlur = 10;
      context.translate(centerX, centerY);
      context.rotate(bodyAngle);
      if (blend < 1) {
        context.globalAlpha = opacity * (1 - blend);
        drawCell(context, sprite, trailingCell, -cellOffset * cellAdvance * BLUR_REACH, 0, runnerWidth, runnerHeight);
      }
      if (blend > 0) {
        context.globalAlpha = opacity * blend;
        drawCell(
          context,
          sprite,
          leadingCell,
          (1 - cellOffset) * cellAdvance * BLUR_REACH,
          0,
          runnerWidth,
          runnerHeight,
        );
      }
      context.restore();
    };

    const loop = (time: number) => {
      if (time - lastPaint > 12) {
        draw(time);
        lastPaint = time;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion) {
        draw(0);
        return;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    const onLoad = () => {
      loaded = true;
      draw(performance.now());
    };

    const onError = () => {
      failed = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      draw(performance.now());
    };

    sprite.addEventListener('load', onLoad, { once: true });
    sprite.addEventListener('error', onError, { once: true });
    sprite.src = dogRunCycleUrl;

    const resizeObserver = new ResizeObserver(() => draw(performance.now()));
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!animationFrame && !failed) start();
      } else if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    });
    visibilityObserver.observe(canvas);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      sprite.removeEventListener('load', onLoad);
      sprite.removeEventListener('error', onError);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
