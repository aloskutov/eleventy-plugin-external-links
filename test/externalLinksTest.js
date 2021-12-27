const test = require('ava');
const externalLinks = require('../src/externalLinks.js');

test('outputPath is undefined', (t) => {
  const outputPath = undefined;
  const content = 'some data';
  t.is(externalLinks(content, outputPath), content);
});

test('outputPath is html', (t) => {
  const outputPath = 'test.html';
  const content = '<html><head><title>test</title></head><body><h1>Test</h1></body></html>';
  t.is(externalLinks(content, outputPath), '<!doctype html>' + content);
});

test('outputPath is js', (t) => {
  const outputPath = 'test.js';
  const content = 'const JS = true';
  t.is(externalLinks(content, outputPath), content);
});

test('local links check', (t) => {
  const outputPath = 'test.html';
  const content = '<!doctype html><html><head></head><body>' +
  '<p>Lorem ipsum dolor sit <a href="/local-link">amet</a>, consectetur adipiscing elit. Phasellus ac nunc ut enim lobortis dignissim. Praesent nisl dui, venenatis a tortor sit amet, bibendum vestibulum mauris. Sed sed pulvinar nunc. Morbi quis efficitur ipsum. <a href="/another-link.html">Proin vestibulum eleifend</a> sem eu sodales. Phasellus id est vel eros commodo placerat eu consectetur arcu. Vestibulum egestas mauris non aliquet varius.</p>' +
  '</body></html>';
  t.is(externalLinks(content, outputPath), content);
});

test('Local links', (t) => {
  const outputPath = 'test.html';
  const config = {'url': 'www.example.com'};
  const content = '<!doctype html><html><head></head><body>' +
  '<p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. Phasellus ac nunc ut enim lobortis dignissim. Praesent nisl dui, venenatis a tortor sit amet, bibendum vestibulum mauris. Sed sed pulvinar nunc. Morbi quis efficitur ipsum. <a href="https://www.example.com/another-local-link.html">Proin vestibulum eleifend</a> sem eu sodales. <a href="//www.example.com/without-protocol">Phasellus</a> id est vel eros commodo placerat eu <a href="www.example.com/consectetur">consectetur</a> arcu. Vestibulum egestas mauris non aliquet varius.</p>' +
  '</body></html>';
  t.is(externalLinks(content, outputPath, config), content);
});

test('External links', (t) => {
  const outputPath = 'test.html';
  const config = {'url': 'http://www.example.com'};
  const content = '<!doctype html><html><head></head><body><a href="www.google.com">Google</a></body></html>';
  const result = '<!doctype html><html><head></head><body><a href="www.google.com" rel="noreferrer nofollow noopener external" target="_blank">Google</a></body></html>';
  t.is(externalLinks(content, outputPath, config), result);
});

test('External links rel:[noreferrer, nofollow]', (t) => {
  const outputPath = 'test.html';
  const config = {
    rel: 'noreferrer',
  };
  const content = '<!doctype html><html><head></head><body><a href="www.google.com">Google</a></body></html>';
  const result = '<!doctype html><html><head></head><body><a href="www.google.com" rel="noreferrer" target="_blank">Google</a></body></html>';
  t.is(externalLinks(content, outputPath, config), result);
});

test('External links overwrite:false', (t) => {
  const outputPath = 'test.html';
  const config = {
    overwrite: false,
    rel: 'noreferrer',
  };
  const content = '<!doctype html><html><head></head><body><a href="www.google.com">Google</a></body></html>';
  const result = '<!doctype html><html><head></head><body><a href="www.google.com" rel="noreferrer" target="_blank">Google</a></body></html>';
  t.is(externalLinks(content, outputPath, config), result);
});
