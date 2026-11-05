/** The groups of activities of the selector and of the filter of nearby plans (HU-068). */
export type ActivityCategory = 'SPORT' | 'CULTURE' | 'LEISURE' | 'FOOD_DRINK' | 'OTHER';

export const CATEGORIES: ActivityCategory[] = [
  'SPORT',
  'CULTURE',
  'LEISURE',
  'FOOD_DRINK',
  'OTHER',
];

/** Activity catalog: the codes are the contract with the users and plans services; names are translated. */
export interface Activity {
  code: string;
  icon: string;
  /** Tone class of the activity colour (styles/objects/_tones.scss) */
  tone: string;
  category: ActivityCategory;
}

/** Code of the activity whose plan carries a name of its own (at most {@link OTHER_MAX_LENGTH} characters). */
export const OTHER = 'OTHER';
export const OTHER_MAX_LENGTH = 30;

export const ACTIVITIES: Activity[] = [
  // Sport
  { code: 'PADEL', icon: 'pi-bolt', tone: 'tone-lime', category: 'SPORT' },
  { code: 'FOOTBALL', icon: 'pi-flag', tone: 'tone-emerald', category: 'SPORT' },
  { code: 'BASKETBALL', icon: 'pi-circle', tone: 'tone-orange', category: 'SPORT' },
  { code: 'TENNIS', icon: 'pi-bolt', tone: 'tone-yellow', category: 'SPORT' },
  { code: 'RUNNING', icon: 'pi-directions-alt', tone: 'tone-sky', category: 'SPORT' },
  { code: 'CYCLING', icon: 'pi-compass', tone: 'tone-teal', category: 'SPORT' },
  { code: 'HIKING', icon: 'pi-map', tone: 'tone-green', category: 'SPORT' },
  { code: 'VOLLEYBALL', icon: 'pi-circle', tone: 'tone-yellow', category: 'SPORT' },
  { code: 'SWIMMING', icon: 'pi-wave-pulse', tone: 'tone-sky', category: 'SPORT' },
  { code: 'CLIMBING', icon: 'pi-chart-line', tone: 'tone-orange', category: 'SPORT' },
  { code: 'GYM', icon: 'pi-trophy', tone: 'tone-emerald', category: 'SPORT' },
  { code: 'YOGA', icon: 'pi-heart', tone: 'tone-teal', category: 'SPORT' },
  { code: 'SKATING', icon: 'pi-gauge', tone: 'tone-lime', category: 'SPORT' },
  { code: 'PADEL_SURF', icon: 'pi-sun', tone: 'tone-sky', category: 'SPORT' },
  { code: 'PING_PONG', icon: 'pi-bullseye', tone: 'tone-green', category: 'SPORT' },
  { code: 'PETANQUE', icon: 'pi-circle', tone: 'tone-lime', category: 'SPORT' },
  // Culture
  { code: 'CINEMA', icon: 'pi-video', tone: 'tone-rose', category: 'CULTURE' },
  { code: 'CONCERTS', icon: 'pi-ticket', tone: 'tone-fuchsia', category: 'CULTURE' },
  { code: 'THEATER', icon: 'pi-face-smile', tone: 'tone-violet', category: 'CULTURE' },
  {
    code: 'MUSEUMS_EXHIBITIONS',
    icon: 'pi-building-columns',
    tone: 'tone-rose',
    category: 'CULTURE',
  },
  // Leisure
  { code: 'BOARD_GAMES', icon: 'pi-th-large', tone: 'tone-violet', category: 'LEISURE' },
  { code: 'VIDEO_GAMES', icon: 'pi-desktop', tone: 'tone-fuchsia', category: 'LEISURE' },
  { code: 'DANCING', icon: 'pi-headphones', tone: 'tone-rose', category: 'LEISURE' },
  { code: 'LANGUAGE_EXCHANGE', icon: 'pi-comments', tone: 'tone-sky', category: 'LEISURE' },
  { code: 'ESCAPE_ROOM', icon: 'pi-key', tone: 'tone-violet', category: 'LEISURE' },
  // Food and drink
  { code: 'TAPAS', icon: 'pi-shopping-bag', tone: 'tone-orange', category: 'FOOD_DRINK' },
  { code: 'MEAL', icon: 'pi-gift', tone: 'tone-yellow', category: 'FOOD_DRINK' },
  { code: 'COFFEE', icon: 'pi-stopwatch', tone: 'tone-orange', category: 'FOOD_DRINK' },
  // Anything else: the plan gives it a name
  { code: OTHER, icon: 'pi-star', tone: 'tone-neutral', category: 'OTHER' },
];

/** What a person can have as a hobby or ask to hear about: everything but «other», which only a plan can be. */
export const INTEREST_ACTIVITIES: Activity[] = ACTIVITIES.filter(({ code }) => code !== OTHER);

export const activityOf = (code: string): Activity =>
  ACTIVITIES.find((activity) => activity.code === code) ?? {
    code,
    icon: 'pi-star',
    tone: 'tone-neutral',
    category: 'OTHER',
  };

/** Translation key of an activity name. */
export const activityKey = (code: string): string => `activities.${code}`;

/** Translation key of the name of a category. */
export const categoryKey = (category: ActivityCategory): string => `categories.${category}`;

/** The activities of a category, in the order of the catalog. */
export const activitiesOfCategory = (category: ActivityCategory, among = ACTIVITIES): Activity[] =>
  among.filter((activity) => activity.category === category);

/** An activity grouped under its category, for the selectors of PrimeNG. */
export interface ActivityGroup {
  category: ActivityCategory;
  label: string;
  items: { code: string; name: string }[];
}

/** Groups the activities by category, with the names translated by {@code translate}; empty categories are left out. */
export const groupActivities = (
  translate: (key: string) => string,
  among: Activity[] = ACTIVITIES,
): ActivityGroup[] =>
  CATEGORIES.map((category) => ({
    category,
    label: translate(categoryKey(category)),
    items: activitiesOfCategory(category, among).map(({ code }) => ({
      code,
      name: translate(activityKey(code)),
    })),
  })).filter((group) => group.items.length > 0);
