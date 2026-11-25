import { Injectable } from '@angular/core';
import { centeredSquare } from '@shared/image/square-photo';
import { RoundedRectContext, traceRoundedRect } from './rounded-rect';

/** Size of a Story (Instagram, WhatsApp, TikTok): vertical, 9:16. */
export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

/** Everything the card says, already translated. */
export interface StoryTexts {
  brand: string;
  /** «¡Falta 1!», «¡Faltan 3!» */
  missing: string;
  activity: string;
  title: string;
  /** «Hoy · 19:30» */
  when: string;
  place: string;
  /** Under the QR code */
  scan: string;
  /** The host of the link, at the bottom */
  link: string;
}

/** Everything the summary of a finished plan says (HU-057), already translated. */
export interface SummaryTexts {
  brand: string;
  /** «¡Plan hecho!» */
  headline: string;
  activity: string;
  title: string;
  /** How many people were in the plan: the figure, big, and its word («4», «personas») */
  people: string;
  peopleLabel: string;
  /** The day of the plan: «24 de noviembre» */
  when: string;
  place: string;
  /** The host of the app, at the bottom */
  link: string;
}

/** Colors of the card: the --ol-story-* tokens, the same in both themes so that the QR code is always dark on light. */
export interface StoryPalette {
  background: string;
  card: string;
  ink: string;
  muted: string;
  onBackground: string;
}

/** The modules of a QR code: true where it is dark. */
export interface QrModules {
  size: number;
  get(row: number, column: number): boolean;
}

/** The part of a 2D canvas context the card uses (tests give a fake one: jsdom has no canvas). */
export type StoryContext = Pick<
  CanvasRenderingContext2D,
  | 'fillStyle'
  | 'font'
  | 'textAlign'
  | 'textBaseline'
  | 'fillRect'
  | 'fillText'
  | 'measureText'
  | 'fill'
  | 'save'
  | 'restore'
  | 'clip'
  | 'drawImage'
> &
  RoundedRectContext;

const MARGIN = 90;
const CARD_TOP = 470;
const CARD_BOTTOM = 1720;
const CARD_PADDING = 70;
const CARD_RADIUS = 56;
const QR_SIZE = 500;
const SUMMARY_HEADLINE_SIZE = 130;
/** The photos of the album in the summary: a row of squares under the title */
const PHOTO_SIZE = 240;
const PHOTO_GAP = 20;
const PHOTO_RADIUS = 28;
const PHOTOS_TOP = 820;

/** Where each line of the summary goes (the baseline of its text) and how big its figure is. */
interface SummaryLayout {
  activity: number;
  figure: number;
  figureSize: number;
  peopleLabel: number;
  when: number;
  place: number;
}
const SUMMARY_PLAIN: SummaryLayout = {
  activity: CARD_TOP + 140,
  figure: 1250,
  figureSize: 340,
  peopleLabel: 1340,
  when: 1500,
  place: 1580,
};
/** With photos the figure is smaller and everything under the title moves down to leave them their row */
const SUMMARY_WITH_PHOTOS: SummaryLayout = {
  activity: CARD_TOP + 110,
  figure: 1320,
  figureSize: 230,
  peopleLabel: 1400,
  when: 1520,
  place: 1590,
};

/** The lines of a text that fit in a width, at most {@code maxLines}; the last one ends with «…» if it is cut. */
export const wrapText = (
  ctx: StoryContext,
  text: string,
  maxWidth: number,
  maxLines: number,
): string[] => {
  const lines: string[] = [];
  let line = '';
  const words = text.trim().split(/\s+/).filter(Boolean);
  for (const [index, word] of words.entries()) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width <= maxWidth || !line) {
      line = candidate;
      continue;
    }
    lines.push(line);
    line = word;
    if (lines.length === maxLines) {
      const rest = [line, ...words.slice(index + 1)].join(' ');
      lines[maxLines - 1] = ellipsis(ctx, `${lines[maxLines - 1]} ${rest}`, maxWidth);
      return lines;
    }
  }
  if (line) {
    lines.push(line);
  }
  return lines;
};

const ellipsis = (ctx: StoryContext, text: string, maxWidth: number): string => {
  let cut = text;
  while (cut.length > 1 && ctx.measureText(`${cut}…`).width > maxWidth) {
    cut = cut.slice(0, -1).trimEnd();
  }
  return `${cut}…`;
};

/** Writes a centered line of the card. */
type Write = (text: string, y: number, weight: number, size: number, color: string) => void;

/**
 * What both cards share: the color of OneLeft filling the story, the brand on top and the white card below. Gives back
 * how to write a centered line.
 */
const startCard = (
  ctx: StoryContext,
  brand: string,
  palette: StoryPalette,
  fontFamily: string,
): Write => {
  const write: Write = (text, y, weight, size, color) => {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.fillText(text, STORY_WIDTH / 2, y);
  };
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  write(brand, 180, 800, 76, palette.onBackground);
  ctx.fillStyle = palette.card;
  const card = {
    x: MARGIN,
    y: CARD_TOP,
    width: STORY_WIDTH - 2 * MARGIN,
    height: CARD_BOTTOM - CARD_TOP,
  };
  traceRoundedRect(ctx, card, CARD_RADIUS);
  ctx.fill();
  return write;
};

/**
 * Draws the card (HU-056): the brand and «¡Falta 1!» on the color of OneLeft; below, on a white card, the activity,
 * the title, when and where, and the QR code that opens the plan.
 */
export const drawStory = (
  ctx: StoryContext,
  texts: StoryTexts,
  qr: QrModules,
  palette: StoryPalette,
  fontFamily: string,
): void => {
  const textWidth = STORY_WIDTH - 2 * (MARGIN + CARD_PADDING);
  const write = startCard(ctx, texts.brand, palette, fontFamily);

  write(texts.missing, 360, 800, 150, palette.onBackground);

  let y = CARD_TOP + 120;
  write(texts.activity.toLocaleUpperCase(), y, 800, 46, palette.background);
  ctx.font = `800 70px ${fontFamily}`;
  for (const line of wrapText(ctx, texts.title, textWidth, 2)) {
    y += 90;
    write(line, y, 800, 70, palette.ink);
  }
  y += 90;
  write(texts.when, y, 700, 54, palette.ink);
  ctx.font = `500 42px ${fontFamily}`;
  const [place] = wrapText(ctx, texts.place, textWidth, 1);
  if (place) {
    y += 70;
    write(place, y, 500, 42, palette.muted);
  }

  const qrTop = CARD_BOTTOM - CARD_PADDING - 80 - QR_SIZE;
  drawQr(ctx, qr, (STORY_WIDTH - QR_SIZE) / 2, qrTop, QR_SIZE, palette);
  write(texts.scan, CARD_BOTTOM - CARD_PADDING - 10, 600, 40, palette.muted);
  write(texts.link, STORY_HEIGHT - 90, 600, 40, palette.onBackground);
};

/**
 * Draws the summary of a finished plan (HU-057), in the way of the cards of Strava: the brand and «¡Plan hecho!» on
 * the color of OneLeft; below, on a white card, the activity, the title, how many people came (the big figure), the
 * day and the place. With photos of the album (HU-052), they go in a row under the title; with none, the card is the
 * same as before.
 */
export const drawSummary = (
  ctx: StoryContext,
  texts: SummaryTexts,
  palette: StoryPalette,
  fontFamily: string,
  photos: readonly ImageBitmap[] = [],
): void => {
  const layout = photos.length ? SUMMARY_WITH_PHOTOS : SUMMARY_PLAIN;
  const textWidth = STORY_WIDTH - 2 * (MARGIN + CARD_PADDING);
  const write = startCard(ctx, texts.brand, palette, fontFamily);

  ctx.font = `800 ${SUMMARY_HEADLINE_SIZE}px ${fontFamily}`;
  const [headline] = wrapText(ctx, texts.headline, STORY_WIDTH - 2 * MARGIN, 1);
  write(headline ?? '', 360, 800, SUMMARY_HEADLINE_SIZE, palette.onBackground);

  let y = layout.activity;
  write(texts.activity.toLocaleUpperCase(), y, 800, 46, palette.background);
  ctx.font = `800 70px ${fontFamily}`;
  for (const line of wrapText(ctx, texts.title, textWidth, 2)) {
    y += 90;
    write(line, y, 800, 70, palette.ink);
  }
  drawPhotos(ctx, photos);

  // The figure of the summary, in the middle of the card
  write(texts.people, layout.figure, 800, layout.figureSize, palette.background);
  write(texts.peopleLabel.toLocaleUpperCase(), layout.peopleLabel, 700, 54, palette.muted);

  write(texts.when, layout.when, 700, 54, palette.ink);
  ctx.font = `500 46px ${fontFamily}`;
  const places = wrapText(ctx, texts.place, textWidth, 2);
  for (const [index, line] of places.entries()) {
    write(line, layout.place + index * 60, 500, 46, palette.muted);
  }
  write(texts.link, STORY_HEIGHT - 90, 600, 40, palette.onBackground);
};

/** The photos of the album in a centered row: each one cut to a square from its centre, with rounded corners. */
const drawPhotos = (ctx: StoryContext, photos: readonly ImageBitmap[]): void => {
  const row = photos.length * PHOTO_SIZE + (photos.length - 1) * PHOTO_GAP;
  const left = (STORY_WIDTH - row) / 2;
  for (const [index, photo] of photos.entries()) {
    const x = left + index * (PHOTO_SIZE + PHOTO_GAP);
    const from = centeredSquare(photo.width, photo.height);
    ctx.save();
    traceRoundedRect(
      ctx,
      { x, y: PHOTOS_TOP, width: PHOTO_SIZE, height: PHOTO_SIZE },
      PHOTO_RADIUS,
    );
    ctx.clip();
    ctx.drawImage(
      photo,
      from.x,
      from.y,
      from.side,
      from.side,
      x,
      PHOTOS_TOP,
      PHOTO_SIZE,
      PHOTO_SIZE,
    );
    ctx.restore();
  }
};

/** The QR code, its dark modules in the ink of the card, inside its own margin (the «quiet zone» of 2 modules). */
const drawQr = (
  ctx: StoryContext,
  qr: QrModules,
  x: number,
  y: number,
  size: number,
  palette: StoryPalette,
): void => {
  const module = size / (qr.size + 4);
  ctx.fillStyle = palette.card;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = palette.ink;
  for (let row = 0; row < qr.size; row++) {
    for (let column = 0; column < qr.size; column++) {
      if (qr.get(row, column)) {
        // A hair larger than the module, so that no seam shows between neighbours
        ctx.fillRect(x + (column + 2) * module, y + (row + 2) * module, module + 0.5, module + 0.5);
      }
    }
  }
};

/** The --ol-story-* tokens and the font of the app, as the page has them. */
const pageStyle = (): { palette: StoryPalette; fontFamily: string } => {
  const style = getComputedStyle(document.documentElement);
  const token = (name: string) => style.getPropertyValue(`--ol-story-${name}`).trim();
  return {
    palette: {
      background: token('background'),
      card: token('card'),
      ink: token('ink'),
      muted: token('muted'),
      onBackground: token('on-background'),
    },
    fontFamily: style.getPropertyValue('--ol-font-sans').trim() || 'sans-serif',
  };
};

/**
 * The card of a plan for Stories (HU-056), made in the device: a PNG of 1080 × 1920 with a QR code of the link of the
 * plan. Nothing goes to a server, and no account of Meta or TikTok is needed: the image is shared with the share
 * sheet. The QR library is loaded only when a card is made.
 */
@Injectable({ providedIn: 'root' })
export class StoryCard {
  async create(texts: StoryTexts, link: string): Promise<Blob> {
    // qrcode is CommonJS: the build only gives it as the default export (the dev server also as named exports)
    const qrcode = await import('qrcode');
    const { create } = qrcode.default ?? qrcode;
    const modules = create(link, { errorCorrectionLevel: 'M' }).modules;
    const qr = {
      size: modules.size,
      get: (row: number, column: number) => modules.get(row, column) === 1,
    };
    return this.render((ctx, palette, fontFamily) =>
      drawStory(ctx, texts, qr, palette, fontFamily),
    );
  }

  /**
   * The summary of a finished plan (HU-057): the same PNG of 1080 × 1920, with no QR code and, if there are any, with
   * photos of its album (see SummaryPhotos). The photos are closed once the card is made.
   */
  async createSummary(texts: SummaryTexts, photos: readonly ImageBitmap[] = []): Promise<Blob> {
    try {
      return await this.render((ctx, palette, fontFamily) =>
        drawSummary(ctx, texts, palette, fontFamily, photos),
      );
    } finally {
      photos.forEach((photo) => photo.close());
    }
  }

  private async render(
    draw: (ctx: StoryContext, palette: StoryPalette, fontFamily: string) => void,
  ): Promise<Blob> {
    const canvas = document.createElement('canvas');
    canvas.width = STORY_WIDTH;
    canvas.height = STORY_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('This browser cannot draw the card');
    }
    // The card uses the font of the app: it must be loaded before drawing
    await document.fonts?.ready;
    const { palette, fontFamily } = pageStyle();
    draw(ctx, palette, fontFamily);
    return new Promise((resolve, reject) =>
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('The card could not be made'))),
        'image/png',
      ),
    );
  }
}
