import { logoMarkUrl } from './assets';

/**
 * The logo artwork is a full circuit plate on a transparent background. These
 * numbers crop it to Reveille alone, measured off the source: the dog occupies
 * x 152..442 / y 166..437, and the die-window border sits at 138..143 and
 * 457..463, so this box clears the border on every side.
 */
export const MARK_CROP = { x: 145, y: 150, size: 304, source: 600 } as const;

export function markImageProps(box: { x: number; y: number; size: number }) {
  const scale = box.size / MARK_CROP.size;
  return {
    href: logoMarkUrl,
    width: MARK_CROP.source * scale,
    height: MARK_CROP.source * scale,
    x: box.x - MARK_CROP.x * scale,
    y: box.y - MARK_CROP.y * scale,
  } as const;
}
