import { useEffect, useRef } from 'react';
import { logoPlateCleanUrl } from '../assets';

/** Gradient offsets outside 0..1 throw, so a travelling band has to clamp. */
function addStop(gradient: CanvasGradient, offset: number, color: string) {
  gradient.addColorStop(Math.min(Math.max(offset, 0), 1), color);
}

export function FlickerGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const logo = new Image();
    logo.src = logoPlateCleanUrl;

    /** The light sweep is clipped to the mark, so the mark gets its own buffer. */
    const markBuffer = document.createElement('canvas');
    const markContext = markBuffer.getContext('2d');

    let frame = 0;
    let last = 0;

    /** Flattens the mark to a cream silhouette and runs a band of light across it. */
    const paintMark = (size: number, ratio: number, sweep: number) => {
      if (!markContext) return false;
      const pixels = Math.max(Math.round(size * ratio), 1);
      if (markBuffer.width !== pixels || markBuffer.height !== pixels) {
        markBuffer.width = pixels;
        markBuffer.height = pixels;
      }

      markContext.setTransform(ratio, 0, 0, ratio, 0, 0);
      markContext.globalCompositeOperation = 'source-over';
      markContext.globalAlpha = 1;
      markContext.clearRect(0, 0, size, size);
      markContext.drawImage(logo, 0, 0, size, size);

      markContext.globalCompositeOperation = 'source-atop';
      markContext.fillStyle = '#f1eee8';
      markContext.fillRect(0, 0, size, size);

      markContext.globalAlpha = 0.4;
      markContext.drawImage(logo, 0, 0, size, size);
      markContext.globalAlpha = 1;

      const head = sweep * 1.7 - 0.35;
      const band = markContext.createLinearGradient(0, 0, size, size);
      addStop(band, head - 0.26, 'rgba(255,236,236,0)');
      addStop(band, head - 0.08, 'rgba(255,240,240,0.4)');
      addStop(band, head, 'rgba(255,255,255,0.88)');
      addStop(band, head + 0.09, 'rgba(217,116,126,0.32)');
      addStop(band, head + 0.26, 'rgba(217,116,126,0)');
      markContext.fillStyle = band;
      markContext.fillRect(0, 0, size, size);

      markContext.globalCompositeOperation = 'source-over';
      return true;
    };

    const draw = (time: number) => {
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = 'source-over';
      context.globalAlpha = 1;
      context.clearRect(0, 0, width, height);

      const size = width < 640 ? 7 : 9;
      const gap = width < 640 ? 9 : 12;
      const step = size + gap;
      const cycle = reduceMotion ? 1.7 : time * 0.00035;
      for (let y = -step; y < height + step; y += step) {
        for (let x = -step; x < width + step; x += step) {
          const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const pulse = (Math.sin(cycle + seed) + 1) / 2;
          const distance = Math.hypot(x - width / 2, y - height / 2) / Math.max(width, height);
          const opacity = Math.max(0, (0.12 - distance * 0.08) * (0.35 + pulse * 0.65));
          const isMaroonCell = Math.abs(Math.floor(seed)) % 19 === 0;
          context.fillStyle = isMaroonCell
            ? `rgba(140,34,48,${Math.min(opacity * 1.8, 0.22).toFixed(3)})`
            : `rgba(241,238,232,${opacity.toFixed(3)})`;
          context.fillRect(x, y, size, size);
        }
      }

      if (logo.complete && logo.naturalWidth > 0) {
        const markSize = Math.min(width * 0.54, height * 0.9, 620);
        const centerX = width / 2;
        const centerY = height / 2;
        const breath = reduceMotion ? 0.5 : (Math.sin(time * 0.00062) + 1) / 2;

        context.save();
        context.globalCompositeOperation = 'lighter';

        const glow = context.createRadialGradient(centerX, centerY, markSize * 0.05, centerX, centerY, markSize * 0.86);
        glow.addColorStop(0, `rgba(163,34,46,${(0.16 + breath * 0.12).toFixed(3)})`);
        glow.addColorStop(0.42, `rgba(118,20,30,${(0.08 + breath * 0.06).toFixed(3)})`);
        glow.addColorStop(1, 'rgba(5,15,28,0)');
        context.fillStyle = glow;
        context.fillRect(centerX - markSize, centerY - markSize, markSize * 2, markSize * 2);

        /** Two rings leave the mark on a slow offset loop, like a signal going out. */
        if (!reduceMotion) {
          context.lineWidth = 1.1;
          for (const offset of [0, 0.5]) {
            const progress = (time * 0.00011 + offset) % 1;
            context.beginPath();
            context.arc(centerX, centerY, markSize * (0.36 + progress * 0.62), 0, Math.PI * 2);
            context.strokeStyle = `rgba(201,74,86,${(0.14 * Math.sin(progress * Math.PI)).toFixed(3)})`;
            context.stroke();
          }
        }
        context.restore();

        const sweep = reduceMotion ? 0.42 : (time * 0.00016) % 1;
        if (paintMark(markSize, ratio, sweep)) {
          context.save();
          context.globalAlpha = 0.34 + breath * 0.08;
          context.drawImage(markBuffer, centerX - markSize / 2, centerY - markSize / 2, markSize, markSize);
          context.restore();
        }
      }
    };

    const loop = (time: number) => {
      if (time - last > 32 || reduceMotion) {
        draw(time);
        last = time;
      }
      if (!reduceMotion) frame = requestAnimationFrame(loop);
    };

    const onLogoLoad = () => draw(performance.now());
    logo.addEventListener('load', onLogoLoad, { once: true });
    draw(performance.now());
    const resizeObserver = new ResizeObserver(() => draw(performance.now()));
    resizeObserver.observe(canvas);

    /** The CTA sits far below the fold, so only paint while it is on screen. */
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        if (!frame && !reduceMotion) frame = requestAnimationFrame(loop);
      } else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    visibility.observe(canvas);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      logo.removeEventListener('load', onLogoLoad);
    };
  }, []);

  return <canvas ref={canvasRef} className="flicker-grid" aria-hidden="true" />;
}
