import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { site } from '../../src/config/site.ts';
import { faqSchema, organizationSchema, serializeJsonLd } from '../../src/lib/schema.ts';

describe('organizationSchema', () => {
  it('describes a Toronto, Ontario educational business', () => {
    const org = organizationSchema(site, 'desc');
    assert.deepEqual(org['@type'], ['EducationalOrganization', 'LocalBusiness']);
    assert.equal(org.url, `${site.url}/`);
    assert.deepEqual(org.address, {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    });
  });

  it('omits the telephone while it is a placeholder', () => {
    const withPlaceholder = { ...site, phone: { display: '[PHONE]', e164: '[PHONE]' } };
    assert.equal('telephone' in organizationSchema(withPlaceholder, 'd'), false);
  });

  it('includes the telephone once it is real', () => {
    const withPhone = { ...site, phone: { display: '(416) 555-0199', e164: '+14165550199' } };
    assert.equal(organizationSchema(withPhone, 'd').telephone, '+14165550199');
  });

  it('never contains placeholder text', () => {
    assert.doesNotMatch(JSON.stringify(organizationSchema(site, 'd')), /\[[A-Z][A-Z0-9 _]*\]/);
  });
});

describe('faqSchema', () => {
  it('maps each question and answer', () => {
    const schema = faqSchema([{ question: 'Q?', answer: 'A.' }]);
    assert.equal(schema['@type'], 'FAQPage');
    assert.deepEqual(schema.mainEntity, [
      { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } },
    ]);
  });
});

describe('serializeJsonLd', () => {
  it('escapes < so content cannot close the script tag', () => {
    const out = serializeJsonLd({ text: '</script><script>alert(1)</script>' });
    assert.doesNotMatch(out, /<\/script>/i);
    assert.deepEqual(JSON.parse(out), { text: '</script><script>alert(1)</script>' });
  });
});
