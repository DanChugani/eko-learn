import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { findPlaceholders, isPlaceholder, realOrUndefined } from '../../src/lib/placeholders.ts';

describe('isPlaceholder', () => {
  it('detects bracketed upper-case tokens', () => {
    assert.equal(isPlaceholder('[RATE]'), true);
    assert.equal(isPlaceholder('[TUTOR 1 NAME]'), true);
    assert.equal(isPlaceholder('from [BUNDLE PRICING] up'), true);
  });

  it('ignores real values and non-strings', () => {
    assert.equal(isPlaceholder('$60'), false);
    assert.equal(isPlaceholder('+14165550199'), false);
    assert.equal(isPlaceholder('[lowercase]'), false);
    assert.equal(isPlaceholder(20), false);
    assert.equal(isPlaceholder(null), false);
  });
});

describe('realOrUndefined', () => {
  it('drops placeholders and keeps real data', () => {
    assert.equal(realOrUndefined('[PHONE]'), undefined);
    assert.equal(realOrUndefined('+14165550199'), '+14165550199');
  });
});

describe('findPlaceholders', () => {
  it('reports the path of every placeholder in nested config', () => {
    const hits = findPlaceholders({
      phone: { display: '[PHONE]', e164: '+1416' },
      tutors: [{ name: 'Real Name' }, { name: '[TUTOR 2 NAME]' }],
      price: 20,
    });
    assert.deepEqual(hits, [
      { path: 'phone.display', value: '[PHONE]' },
      { path: 'tutors[1].name', value: '[TUTOR 2 NAME]' },
    ]);
  });

  it('returns an empty list when everything is filled in', () => {
    assert.deepEqual(findPlaceholders({ a: 'x', b: ['y'] }), []);
  });
});
