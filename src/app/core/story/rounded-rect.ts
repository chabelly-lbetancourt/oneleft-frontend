/** The part of a 2D canvas context a rounded rectangle needs. */
export type RoundedRectContext = Pick<
  CanvasRenderingContext2D,
  'beginPath' | 'moveTo' | 'arcTo' | 'closePath'
>;

/** A rectangle of the canvas, in pixels. */
export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Starts a path with a rectangle of rounded corners, ready to fill or to clip. It does not use
 * `CanvasRenderingContext2D.roundRect`, which the WebView of Android only has from version 99 (#183): `arcTo` is
 * everywhere. The radius never goes beyond half of the shorter side.
 */
export const traceRoundedRect = (ctx: RoundedRectContext, rect: Rect, radius: number): void => {
  const { x, y, width, height } = rect;
  const right = x + width;
  const bottom = y + height;
  const corner = Math.max(0, Math.min(radius, width / 2, height / 2));
  ctx.beginPath();
  ctx.moveTo(x + corner, y);
  ctx.arcTo(right, y, right, bottom, corner);
  ctx.arcTo(right, bottom, x, bottom, corner);
  ctx.arcTo(x, bottom, x, y, corner);
  ctx.arcTo(x, y, right, y, corner);
  ctx.closePath();
};
