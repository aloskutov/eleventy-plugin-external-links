'use strict';

const {getOptionRel, concatRel} = require('../src/handlerRel');

describe('rel attribute handler test', () => {
  test('getOptionRel is undefined', () => {
    const content = '';
    const value = undefined;
    expect(getOptionRel(value)).toBe(content);
  });

  test('getOptionRel default value', () => {
    const content = 'noreferrer nofollow noopener external';
    const value = ['noreferrer', 'nofollow', 'noopener', 'external'];
    expect(getOptionRel(value)).toBe(content);
  });

  test('concatRel with attribute value and rel', () => {
    const attr = 'somevalue ';
    const rel = 'noreferrer nofollow noopener external';
    const expected = 'somevalue noreferrer nofollow noopener external';
    expect(concatRel(attr, rel)).toBe(expected);
  });

  test('concatRel with duplicated value', () => {
    const attr = 'noreferrer   noopener';
    const rel = 'noreferrer nofollow noopener external';
    expect(concatRel(attr, rel)).toMatch(/noreferrer/);
    expect(concatRel(attr, rel)).toMatch(/nofollow/);
    expect(concatRel(attr, rel)).toMatch(/noopener/);
    expect(concatRel(attr, rel)).toMatch(/external/);
    expect(concatRel(attr, rel).split(' ').length).toBe(4);
  });
});
