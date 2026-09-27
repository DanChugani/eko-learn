import type { Site } from '../config/site.ts';
import { realOrUndefined } from './placeholders.ts';

type JsonLd = Record<string, unknown>;

/** Drops undefined values so placeholders never reach structured data. */
function compact<T extends JsonLd>(obj: T): T {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as T;
}

export function organizationSchema(site: Site, description: string): JsonLd {
  const origin = site.url.replace(/\/$/, '');
  return compact({
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${origin}/#organization`,
    name: site.name,
    url: `${origin}/`,
    description,
    email: site.email,
    telephone: realOrUndefined(site.phone.e164),
    logo: `${origin}/icon-512.png`,
    image: `${origin}${site.ogImage}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.location.city,
      addressRegion: site.location.regionCode,
      addressCountry: site.location.country,
    },
    areaServed: [
      { '@type': 'City', name: site.location.city },
      { '@type': 'State', name: site.location.region },
    ],
    currenciesAccepted: site.pricing.currency,
  });
}

export interface Faq {
  question: string;
  answer: string;
}

export function faqSchema(faqs: Faq[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/** Serializes JSON-LD safely for inline <script> (no premature </script> close). */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
