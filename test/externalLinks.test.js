'use strict';

const externalLinks = require('../src/externalLinks.js');

test('outputPath is undefined', () => {
  const content = 'some data';
  expect(externalLinks(content)).toBe(content);
});

test('outputPath is html', () => {
  const outputPath = 'test.html';
  const content = `<html><head>
  <title>test</title>
  </head>
  <body>
  <h1>Test</h1>
  </body></html>`;
  expect(externalLinks(content, outputPath)).toBe(`<!doctype html>${content}`);
});

test('outputPath is js', () => {
  const outputPath = 'test.js';
  const content = 'const JS = true';
  expect(externalLinks(content, outputPath)).toBe(content);
});

test('local links, relative', () => {
  const outputPath = 'test.html';
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <p>Lorem ipsum dolor sit <a href="/local-link">amet</a>, consectetur adipiscing elit. Morbi quis efficitur ipsum. <a href="/another-link.html">Proin vestibulum eleifend</a> sem eu sodales.</p>
  </body></html>`;
  expect(externalLinks(content, outputPath)).toBe(content);
});

test('local links with query string', () => {
  const outputPath = 'test.html';
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <p>Lorem ipsum dolor sit <a href="/what-is/?amet">amet</a>, consectetur adipiscing elit. <a href="?another-link=123">Proin vestibulum eleifend</a> sem eu sodales.</p>
  </body></html>`;
  expect(externalLinks(content, outputPath)).toBe(content);
});

test('local links with id', () => {
  const outputPath = 'test.html';
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <p>Lorem ipsum dolor sit <a href="#amet">amet</a>, consectetur adipiscing elit.Sed sed pulvinar nunc. <a href="/another-link/#123">Proin vestibulum eleifend</a> sem eu sodales. </p>
  </body></html>`;
  expect(externalLinks(content, outputPath)).toBe(content);
});

test('Local links, with domain', () => {
  const outputPath = 'test.html';
  const config = {'url': 'www.example.com'};
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. <a href="https://www.example.com/another-local-link.html">Proin vestibulum eleifend</a> sem eu sodales. <a href="//www.example.com/without-protocol">Phasellus</a> id est vel eros commodo placerat eu <a href="www.example.com/consectetur">consectetur</a> arcu.</p>
  </body></html>`;
  expect(externalLinks(content, outputPath, config)).toBe(content);
});

test('External links', () => {
  const outputPath = 'test.html';
  const config = {'url': 'http://www.example.com'};
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com">Google</a>
  </body></html>`;
  const result = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com" rel="noreferrer nofollow noopener external" target="_blank">Google</a>
  </body></html>`;
  expect(externalLinks(content, outputPath, config)).toBe(result);
});

test('External links rel:[noreferrer, nofollow]', () => {
  const outputPath = 'test.html';
  const config = {
    rel: 'noreferrer',
  };
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com">Google</a>
  </body></html>`;
  const result = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
  </body></html>`;
  expect(externalLinks(content, outputPath, config)).toBe(result);
});

test('External links overwrite:false', () => {
  const outputPath = 'test.html';
  const config = {
    overwrite: false,
    rel: 'noreferrer',
  };
  const content = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com">Google</a>
  </body></html>`;
  const result = `<!doctype html><html><head>
  </head>
  <body>
  <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
  </body></html>`;
  expect(externalLinks(content, outputPath, config)).toBe(result);
});
