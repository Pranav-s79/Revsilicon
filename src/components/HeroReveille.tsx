import { useEffect, useRef } from 'react';
import { dogRunCycleUrl } from '../assets';
import { prefersReducedMotion } from '../motion';

const ROW_STEP = 13;
const LEAP_SEQUENCE_SECONDS = 9.2;
const FRAME_COLUMNS = 4;
const FRAME_WIDTH = 384;
const FRAME_HEIGHT = 320;

type LeapPose = {
  readonly from: number;
  readonly to: number;
  readonly mix: number;
};

type BrandPose = {
  readonly x: number;
  readonly y: number;
  readonly angle: number;
  readonly scale: number;
  readonly bend: number;
  readonly skew: number;
};

const DEFAULT_BRAND_POSE: BrandPose = {
  x: 0.48,
  y: 0.49,
  angle: -0.04,
  scale: 1,
  bend: 0,
  skew: 0,
};

const BRAND_POSES: readonly BrandPose[] = [
  DEFAULT_BRAND_POSE,
  { x: 0.48, y: 0.5, angle: -0.03, scale: 0.94, bend: 0.09, skew: -0.08 },
  { x: 0.49, y: 0.46, angle: -0.08, scale: 1, bend: -0.04, skew: 0.06 },
  { x: 0.5, y: 0.47, angle: 0, scale: 1.04, bend: -0.08, skew: 0.03 },
  { x: 0.48, y: 0.48, angle: 0.06, scale: 1, bend: 0.04, skew: -0.03 },
  { x: 0.49, y: 0.5, angle: -0.03, scale: 0.95, bend: 0.1, skew: -0.07 },
  { x: 0.5, y: 0.5, angle: -0.05, scale: 0.97, bend: 0.07, skew: 0.05 },
  { x: 0.5, y: 0.48, angle: 0.02, scale: 1.03, bend: -0.06, skew: 0.02 },
] as const;

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

function drawFrame(
  target: CanvasRenderingContext2D,
  sprite: HTMLImageElement,
  frame: number,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
) {
  const sourceX = (frame % FRAME_COLUMNS) * FRAME_WIDTH;
  const sourceY = Math.floor(frame / FRAME_COLUMNS) * FRAME_HEIGHT;
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

function transition(from: number, to: number, phase: number): LeapPose {
  return { from, to, mix: smoothStep((phase - 0.28) / 0.72) };
}

function getLeapPose(progress: number, alternate: boolean): LeapPose {
  const crouch = alternate ? 5 : 1;
  const launch = alternate ? 6 : 2;
  const flight = alternate ? 7 : 3;

  if (progress < 0.12) return transition(0, crouch, progress / 0.12);
  if (progress < 0.24) return transition(crouch, launch, (progress - 0.12) / 0.12);
  if (progress < 0.4) return transition(launch, flight, (progress - 0.24) / 0.16);
  if (progress < 0.68) return { from: flight, to: flight, mix: 0 };
  if (progress < 0.84) return transition(flight, 4, (progress - 0.68) / 0.16);
  return transition(4, 0, (progress - 0.84) / 0.16);
}

function blendBrandPose(pose: LeapPose): BrandPose {
  const from = BRAND_POSES[pose.from] ?? DEFAULT_BRAND_POSE;
  const to = BRAND_POSES[pose.to] ?? from;
  return {
    x: from.x + (to.x - from.x) * pose.mix,
    y: from.y + (to.y - from.y) * pose.mix,
    angle: from.angle + (to.angle - from.angle) * pose.mix,
    scale: from.scale + (to.scale - from.scale) * pose.mix,
    bend: from.bend + (to.bend - from.bend) * pose.mix,
    skew: from.skew + (to.skew - from.skew) * pose.mix,
  };
}

function drawBrandMark(
  target: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  runnerWidth: number,
  runnerHeight: number,
  pose: LeapPose,
) {
  const brand = blendBrandPose(pose);
  const saddleWidth = runnerWidth * 0.19 * brand.scale;
  const saddleHeight = runnerHeight * 0.15 * brand.scale;

  target.save();
  target.translate(
    centerX + (brand.x - 0.5) * runnerWidth,
    centerY + (brand.y - 0.5) * runnerHeight,
  );
  target.rotate(brand.angle);
  target.transform(1, brand.skew, brand.skew * 0.18, 1, 0, 0);
  target.globalAlpha *= 0.42;

  // Reveille's mark sits on a curved saddle blanket, not a separate badge.
  target.strokeStyle = '#ffffff';
  target.lineWidth = Math.max(1.4, runnerWidth * 0.0033);
  target.lineCap = 'round';
  target.lineJoin = 'round';
  target.beginPath();
  target.moveTo(-saddleWidth * 0.54, -saddleHeight * 0.18);
  target.quadraticCurveTo(-saddleWidth * 0.62, saddleHeight * 0.14, -saddleWidth * 0.43, saddleHeight * 0.43);
  target.quadraticCurveTo(
    -saddleWidth * 0.04,
    saddleHeight * (0.67 + brand.bend),
    saddleWidth * 0.37,
    saddleHeight * 0.48,
  );
  target.quadraticCurveTo(saddleWidth * 0.55, saddleHeight * 0.16, saddleWidth * 0.49, -saddleHeight * 0.17);
  target.stroke();

  target.fillStyle = '#ffffff';
  target.textAlign = 'center';
  target.textBaseline = 'middle';
  const monogramSize = Math.max(12, runnerWidth * 0.031);
  target.font = `900 ${monogramSize * 1.28}px Georgia, serif`;
  target.fillText('T', 0, saddleHeight * 0.02);
  target.font = `900 ${monogramSize * 0.82}px Georgia, serif`;
  target.fillText('A', -monogramSize * 0.46, saddleHeight * 0.12);
  target.fillText('M', monogramSize * 0.5, saddleHeight * 0.12);
  target.restore();
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
      const runnerWidth = narrow ? Math.min(width * 0.78, height * 0.62) : Math.min(width * 0.48, height * 0.9);
      const runnerHeight = runnerWidth * (FRAME_HEIGHT / FRAME_WIDTH);
      const startX = -runnerWidth * 0.55;
      const endX = width + runnerWidth * 0.55;
      const sequenceProgress = reduceMotion
        ? 0.76
        : (seconds % LEAP_SEQUENCE_SECONDS) / LEAP_SEQUENCE_SECONDS;
      let centerX: number;
      let leapArc: number;
      let bodyAngle = 0;
      let pose: LeapPose;

      if (reduceMotion) {
        centerX = width * 0.72;
        leapArc = 0.82;
        pose = { from: 3, to: 3, mix: 0 };
      } else {
        const secondLeap = sequenceProgress >= 0.5;
        const leapProgress = (sequenceProgress % 0.5) * 2;
        centerX = startX + (endX - startX) * sequenceProgress;
        leapArc = Math.pow(Math.sin(Math.PI * leapProgress), 0.92);
        bodyAngle = -Math.sin(Math.PI * 2 * leapProgress) * 0.035;
        pose = getLeapPose(leapProgress, secondLeap);
      }

      const baseCenterY = height * (narrow ? 0.75 : 0.63);
      const centerY =
        baseCenterY
        - leapArc * height * (narrow ? 0.17 : 0.22);
      const copyZoneFade = narrow
        ? 1
        : Math.max(0.08, smoothStep((centerX - width * 0.38) / (width * 0.14)));

      context.save();
      context.globalAlpha = (0.08 + copyZoneFade * 0.14) * (1 - leapArc * 0.62);
      context.fillStyle = '#160005';
      context.beginPath();
      context.ellipse(
        centerX,
        baseCenterY + runnerHeight * 0.38,
        runnerWidth * 0.27 * (1 - leapArc * 0.42),
        runnerHeight * 0.028,
        0,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.restore();

      context.save();
      context.globalAlpha = copyZoneFade;
      context.shadowColor = 'rgba(255, 218, 221, 0.2)';
      context.shadowBlur = 12;
      context.translate(centerX, centerY);
      context.rotate(bodyAngle);
      if (pose.mix < 1) {
        context.globalAlpha = copyZoneFade * (1 - pose.mix);
        drawFrame(context, sprite, pose.from, 0, 0, runnerWidth, runnerHeight);
        drawBrandMark(context, 0, 0, runnerWidth, runnerHeight, { from: pose.from, to: pose.from, mix: 0 });
      }
      if (pose.mix > 0) {
        context.globalAlpha = copyZoneFade * pose.mix;
        drawFrame(context, sprite, pose.to, 0, 0, runnerWidth, runnerHeight);
        drawBrandMark(context, 0, 0, runnerWidth, runnerHeight, { from: pose.to, to: pose.to, mix: 0 });
      }
      context.restore();
    };

    const loop = (time: number) => {
      if (time - lastPaint > 16) {
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
