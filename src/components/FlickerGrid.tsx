import { useEffect, useRef } from 'react';
import { logoMarkUrl } from '../assets';

export function FlickerGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const logo = new Image();
    logo.src = logoMarkUrl;
    let frame = 0;
    let last = 0;

    const draw = (time: number) => {
      const ratio = Math.min(window.devicePixelRatio, 1.5);
      const width = Math.max(canvas.clientWidth, 1);
      const height = Math.max(canvas.clientHeight, 1);
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
      }
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
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
        const logoSize = Math.min(width * 0.54, height * 0.9, 620);
        const left = width / 2 - logoSize / 2;
        const top = height / 2 - logoSize / 2;
        context.save();
        context.globalAlpha = 0.36 + (reduceMotion ? 0.03 : (Math.sin(cycle * 1.4) + 1) * 0.04);
        context.drawImage(logo, left, top, logoSize, logoSize);
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = '#f1eee8';
        context.fillRect(left, top, logoSize, logoSize);
        context.restore();

        context.save();
        context.globalAlpha = 0.16;
        context.drawImage(logo, left, top, logoSize, logoSize);
        context.restore();
      }
    };

    const loop = (time: number) => {
      if (time - last > 75 || reduceMotion) {
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
