'use strict';

const parseOptions = require('../src/parseOptions');
const defaultOptions = {
  url: '',
  ext: ['.html'],
};

test('Test empty & undefined user options', () => {
  expect(parseOptions()).toStrictEqual({});
  expect(parseOptions(defaultOptions)).toStrictEqual(defaultOptions);
  expect(parseOptions(defaultOptions, null)).toStrictEqual(defaultOptions);
  expect(parseOptions(defaultOptions, '')).toStrictEqual(defaultOptions);
});

test('Set options', () => {
  expect(parseOptions(defaultOptions, {'url': 'www.example.com'})).toStrictEqual({'url': 'www.example.com', 'ext': ['.html']});
  expect(parseOptions(defaultOptions, {'url': 'www.example.com', 'ext': ['.html', '.htm']})).toStrictEqual({'url': 'www.example.com', 'ext': ['.html', '.htm']});
});
