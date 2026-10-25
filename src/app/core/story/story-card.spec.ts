import { TestBed } from '@angular/core/testing';
import {
  drawStory,
  QrModules,
  STORY_HEIGHT,
  STORY_WIDTH,
  StoryCard,
  StoryContext,
  StoryTexts,
  wrapText,
} from './story-card';

/** A 2D context that measures 30 px per character and keeps what is drawn (jsdom has no canvas). */
const fakeContext = () => {
  const texts: { text: string; font: string; color: string }[] = [];
  const rects: { x: number; y: number; width: number; height: number; color: string }[] = [];
  const ctx = {
    fillStyle: '',
    font: '',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    fillRect(x: number, y: number, width: number, height: number) {
      rects.push({ x, y, width, height, color: String(this.fillStyle) });
    },
    fillText(text: string) {
      texts.push({ text, font: this.font, color: String(this.fillStyle) });
    },
    measureText: (text: string) => ({ width: text.length * 30 }) as TextMetrics,
    beginPath: vi.fn(),
    roundRect: vi.fn(),
    fill: vi.fn(),
  };
  return { ctx: ctx as unknown as StoryContext, texts, rects };
};

const TEXTS: StoryTexts = {
  brand: 'OneLeft',
  missing: '¡Falta 1!',
  activity: 'Pádel',
  title: 'Pádel 2 contra 2',
  when: 'Hoy · 19:30',
  place: 'Pistas de la Albufera',
  scan: 'Escanea y apúntate',
  link: 'oneleft.example.com',
};
const PALETTE = {
  background: 'orange',
  card: 'white',
  ink: 'black',
  muted: 'grey',
  onBackground: 'snow',
};
/** A chessboard of 21 × 21 modules: 221 of them dark */
const CHESS: QrModules = { size: 21, get: (row, column) => (row + column) % 2 === 0 };

describe('drawStory', () => {
  it('should write the plan on the card and draw every dark module of the QR code (HU-056)', () => {
    const { ctx, texts, rects } = fakeContext();

    drawStory(ctx, TEXTS, CHESS, PALETTE, 'Plus Jakarta Sans');

    expect(texts.map(({ text }) => text)).toEqual([
      'OneLeft',
      '¡Falta 1!',
      'PÁDEL',
      'Pádel 2 contra 2',
      'Hoy · 19:30',
      'Pistas de la Albufera',
      'Escanea y apúntate',
      'oneleft.example.com',
    ]);
    // «¡Falta 1!», big and on the color of OneLeft
    expect(texts[1]).toEqual({
      text: '¡Falta 1!',
      font: '800 150px Plus Jakarta Sans',
      color: 'snow',
    });
    // The color of OneLeft fills the whole story
    expect(rects[0]).toEqual({
      x: 0,
      y: 0,
      width: STORY_WIDTH,
      height: STORY_HEIGHT,
      color: 'orange',
    });
    // The QR code: dark modules in ink, on its own white square, inside the story
    const modules = rects.filter(({ color }) => color === 'black');
    expect(modules).toHaveLength(221);
    expect(
      modules.every(
        ({ x, y, width }) => x > 0 && y > 0 && x + width < STORY_WIDTH && y + width < STORY_HEIGHT,
      ),
    ).toBe(true);
  });
});

describe('wrapText', () => {
  it('should split a long text in the lines that fit and end the last one with an ellipsis', () => {
    const { ctx } = fakeContext();

    // 30 px per character: 10 characters per line of 300 px
    expect(wrapText(ctx, 'uno dos tres', 300, 2)).toEqual(['uno dos', 'tres']);
    expect(wrapText(ctx, 'uno dos tres cuatro cinco seis', 300, 2)).toEqual([
      'uno dos',
      'tres cuat…',
    ]);
    expect(wrapText(ctx, '   ', 300, 2)).toEqual([]);
  });
});

describe('StoryCard', () => {
  const dark = async (link: string) => {
    const { create } = await import('qrcode');
    const { modules } = create(link, { errorCorrectionLevel: 'M' });
    return [...modules.data].filter((bit) => bit === 1).length;
  };

  afterEach(() => vi.restoreAllMocks());

  it('should make a PNG of 1080 × 1920 with the QR code of the link of the plan', async () => {
    const { ctx, rects } = fakeContext();
    const getContext = vi
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue(ctx as unknown as CanvasRenderingContext2D);
    const toBlob = vi
      .spyOn(HTMLCanvasElement.prototype, 'toBlob')
      .mockImplementation((callback) => callback(new Blob(['png'], { type: 'image/png' })));
    const link = 'https://oneleft.example.com/share/plans/plan-1';

    const image = await TestBed.inject(StoryCard).create(TEXTS, link);

    expect(image.type).toBe('image/png');
    expect(getContext).toHaveBeenCalledWith('2d');
    const canvas = toBlob.mock.contexts[0] as HTMLCanvasElement;
    expect([canvas.width, canvas.height]).toEqual([STORY_WIDTH, STORY_HEIGHT]);
    // Every dark module of the code of the link, as small squares
    expect(rects.filter(({ width }) => width < 50)).toHaveLength(await dark(link));
  });

  it('should fail where the browser cannot draw', async () => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);

    await expect(
      TestBed.inject(StoryCard).create(TEXTS, 'https://oneleft.example.com'),
    ).rejects.toThrow();
  });
});
