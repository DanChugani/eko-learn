/**
 * Every business constant for the site lives here.
 *
 * Values in [SQUARE BRACKETS] are placeholders that still need real data.
 * Run `npm run check:placeholders` to list any that are left.
 * Anything that is a placeholder is shown on the page as-is (so it is obvious)
 * but is left out of structured data (JSON-LD) so search engines never see it.
 */

export interface Tutor {
  name: string;
  subjects: string;
  credential: string;
  /** Path under /public, e.g. '/tutors/jane.jpg' (square, at least 320x320). null shows a neutral placeholder. */
  photo: string | null;
}

export const site = {
  name: 'Ekolearn',
  /** Canonical origin. The live domain redirects ekolearn.com to www, so www is canonical. */
  url: 'https://www.ekolearn.com',
  locale: 'en_CA',
  lang: 'en-CA',

  email: 'hello@ekolearn.com',
  phone: {
    /** Shown on the page, e.g. '(416) 555-0199'. */
    display: '[PHONE]',
    /** E.164 format for tel: links and JSON-LD, e.g. '+14165550199'. */
    e164: '[PHONE]',
  },
  location: {
    city: 'Toronto',
    region: 'Ontario',
    regionCode: 'ON',
    country: 'CA',
  },

  /** Booking page. TODO: replace with an Ekolearn-branded Calendly event when it exists. */
  calendlyUrl: 'https://calendly.com/kay-tutoring',
  /** Where the worksheets "Join early access" button goes. Swap for a form URL any time. */
  worksheetsEarlyAccessUrl: 'mailto:hello@ekolearn.com?subject=Worksheets%20early%20access',

  /** Social share image, 1200x630, under /public. */
  ogImage: '/og-image.png',

  pricing: {
    currency: 'CAD',
    /** Per-session tutoring rate, shown as e.g. '$60'. */
    sessionRate: '[RATE]',
    /** e.g. '60-minute'. */
    sessionLength: '[SESSION LENGTH]',
    /** One line describing bundle discounts, e.g. '10 sessions for $540 (save 10%)'. */
    bundleSummary: '[BUNDLE PRICING]',
    /** Practice worksheets, monthly, in dollars. */
    worksheetsMonthly: 20,
  },

  tutors: [
    { name: '[TUTOR 1 NAME]', subjects: '[SUBJECTS]', credential: '[CREDENTIAL]', photo: null },
    { name: '[TUTOR 2 NAME]', subjects: '[SUBJECTS]', credential: '[CREDENTIAL]', photo: null },
    { name: '[TUTOR 3 NAME]', subjects: '[SUBJECTS]', credential: '[CREDENTIAL]', photo: null },
  ] satisfies Tutor[],

  features: {
    /** Tutors section and its nav link. Turn off if profiles are not ready at launch. */
    tutors: true,
    /** Adult education / IELTS section. Kept in the codebase, hidden from the K-12 homepage. */
    adultEducation: false,
  },
} as const;

export type Site = typeof site;
