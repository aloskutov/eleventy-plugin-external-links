'use strict';

const getExcludedHosts = require('../src/getExcludedHosts');


test('Test #1: Empty & Undefined', () => {
  expect(getExcludedHosts()).toStrictEqual([]);
  expect(getExcludedHosts(null)).toStrictEqual([]);
  expect(getExcludedHosts(false)).toStrictEqual([]);
  expect(getExcludedHosts([])).toStrictEqual([]);
});

test('Test #2: String', () => {
  expect(getExcludedHosts('https://www.example.com')).toStrictEqual(['www.example.com']);
  expect(getExcludedHosts('//www.example.com')).toStrictEqual(['www.example.com']);
  expect(getExcludedHosts('www.example.com')).toStrictEqual(['www.example.com']);
  expect(getExcludedHosts('/index.html')).toStrictEqual([]);
  expect(getExcludedHosts('./index.html')).toStrictEqual([]);
  expect(getExcludedHosts('../index.html')).toStrictEqual([]);
  expect(getExcludedHosts('../index.html?query=test')).toStrictEqual([]);
  expect(getExcludedHosts('?query=test')).toStrictEqual([]);
  expect(getExcludedHosts('tel:+79123456789')).toStrictEqual([]);
  expect(getExcludedHosts('mailto:user@example.com')).toStrictEqual([]);
});

test('Test #3: Array', () => {
  expect(getExcludedHosts(['https://www.example.com', '//test.com', 'tel:+79123456789', 'mailto:user@example.com', '//www.example.com/'])).toStrictEqual(['www.example.com', 'test.com']);
  expect(getExcludedHosts(['http://www.example.com', 'http://blog.example.com', 'https://user@admin.example.com'])).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
});
