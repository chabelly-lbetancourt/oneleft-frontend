import { RoundedRectContext, traceRoundedRect } from './rounded-rect';

/** A context that keeps the calls of the path, in order. */
const fakeContext = () => {
  const calls: (string | number)[][] = [];
  const record =
    (name: string) =>
    (...args: number[]) => {
      calls.push([name, ...args]);
    };
  const ctx: RoundedRectContext = {
    beginPath: record('beginPath'),
    moveTo: record('moveTo'),
    arcTo: record('arcTo'),
    closePath: record('closePath'),
  };
  return { ctx, calls };
};

describe('traceRoundedRect', () => {
  it('should trace the four corners with arcTo, clockwise from the top left (#183)', () => {
    const { ctx, calls } = fakeContext();

    traceRoundedRect(ctx, { x: 10, y: 20, width: 100, height: 200 }, 16);

    expect(calls).toEqual([
      ['beginPath'],
      ['moveTo', 26, 20],
      ['arcTo', 110, 20, 110, 220, 16],
      ['arcTo', 110, 220, 10, 220, 16],
      ['arcTo', 10, 220, 10, 20, 16],
      ['arcTo', 10, 20, 110, 20, 16],
      ['closePath'],
    ]);
  });

  it('should not need roundRect, which an old WebView does not have (#183)', () => {
    const { ctx } = fakeContext();

    expect('roundRect' in ctx).toBe(false);
    expect(() => traceRoundedRect(ctx, { x: 0, y: 0, width: 50, height: 50 }, 8)).not.toThrow();
  });

  it('should keep the radius within half of the shorter side', () => {
    const { ctx, calls } = fakeContext();

    traceRoundedRect(ctx, { x: 0, y: 0, width: 100, height: 40 }, 56);

    expect(calls[1]).toEqual(['moveTo', 20, 0]);
    expect(calls.filter(([name]) => name === 'arcTo').map((call) => call[5])).toEqual([
      20, 20, 20, 20,
    ]);
  });

  it('should trace a plain rectangle when the radius is zero or negative', () => {
    const { ctx, calls } = fakeContext();

    traceRoundedRect(ctx, { x: 0, y: 0, width: 100, height: 40 }, -5);

    expect(calls[1]).toEqual(['moveTo', 0, 0]);
    expect(calls[2]).toEqual(['arcTo', 100, 0, 100, 40, 0]);
  });
});
