'use strict';

const externalLinks = require('../src/externalLinks.js');

describe('OutputPath tests', () => {
  test('outputPath is undefined', () => {
    const content = 'some data';
    expect(externalLinks(content)).toBe(content);
  });
  test('outputPath is html', () => {
    const outputPath = 'test.html';
    const content = `<html><head><title>test</title></head><body><h1>Test</h1></body></html>`;
    expect(externalLinks(content, outputPath)).toBe(`<!doctype html>${content}`);
  });
  test('outputPath is js', () => {
    const outputPath = 'test.js';
    const content = 'const JS = true;';
    expect(externalLinks(content, outputPath)).toBe(content);
  });
});

describe('Local links tests', () => {
  test('local links, relative', () => {
    const outputPath = 'test.html';
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="/local-link">amet</a>, consectetur adipiscing elit. Morbi quis efficitur ipsum. <a href="/another-link.html">Proin vestibulum eleifend</a> sem  eu sodales.</p>
    </body></html>`;
    expect(externalLinks(content, outputPath)).toBe(content);
  });

  test('local links with query string', () => {
    const outputPath = 'test.html';
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="/what-is/?amet">amet</a>, consectetur adipiscing elit. <a href="?another-link=123">Proin vestibulum eleifend</a> sem eu sodales.</p>
    </body></html>`;
    expect(externalLinks(content, outputPath)).toBe(content);
  });

  test('local links with id', () => {
    const outputPath = 'test.html';
    const config = {'url': 'https://www.example.com'};
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="#amet">amet</a>, consectetur adipiscing elit.Sed sed pulvinar nunc. <a href="/another-link/#123">Proin vestibulum eleifend</a> sem eu sodales.  </p>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(content);
  });

  test('Local links, with domain', () => {
    const outputPath = 'test.html';
    const config = {'url': 'https://www.example.com', 'ext': '.html'};
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. <a href="//www.example.com/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://www.google.com/without-protocol">Phasellus</a> id est vel eros commodo placerat eu <a href="www.example.com/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. <a href="//www.example.com/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://www.google.com/without-protocol" rel="noreferrer nofollow noopener external" target="_blank">Phasellus</a> id est vel eros commodo placerat eu <a href="www.example.com/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });

  test('Local links, with domain, ru', () => {
    const outputPath = 'test.html';
    const config = {'url': 'https://какой-то-домен.рф', 'ext': '.html'};
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://какой-то-домен.рф/local-link">amet</a>, consectetur adipiscing elit. <a href="//какой-то-домен.рф/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://другой-домен.рф/without-protocol">Phasellus</a> id est vel eros commodo placerat eu <a href="какой-то-домен.рф/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://какой-то-домен.рф/local-link">amet</a>, consectetur adipiscing elit. <a href="//какой-то-домен.рф/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://другой-домен.рф/without-protocol" rel="noreferrer nofollow noopener external" target="_blank">Phasellus</a> id est vel eros commodo placerat eu <a href="какой-то-домен.рф/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });

  test('Test excludedDomains', () => {
    const outputPath = 'test.html';
    const config = {'url': 'https://www.example.com', 'excludedDomains': ['blog.example.com', 'other.example-host.eu']};
    const content = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. <a href="//blog.example.com/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://www.google.com/without-protocol">Phasellus</a> id est vel eros commodo placerat eu <a href="https://other.example-host.eu/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <p>Lorem ipsum dolor sit <a href="http://www.example.com/local-link">amet</a>, consectetur adipiscing elit. <a href="//blog.example.com/another-local-link.html">Proin   vestibulum eleifend</a> sem eu sodales. <a href="https://www.google.com/without-protocol" rel="noreferrer nofollow noopener external" target="_blank">Phasellus</a> id est vel eros commodo placerat eu <a href="https://other.example-host.eu/  consectetur">consectetur</a> arcu.</p>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });
});

describe('External links tests', () => {
  test('External links', () => {
    const outputPath = 'test.html';
    const content = `<!doctype html><html><head>
    </head><body>
    <a href="www.google.com">Google</a>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer nofollow noopener external" target="_blank">Google</a>
    </body></html>`;
    expect(externalLinks(content, outputPath)).toBe(result);
  });

  test('External links IDN ru', () => {
    const outputPath = 'test.html';
    const content = `<!doctype html><html><head>
    </head><body>
    <a href="почта.рф">Почта России</a>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <a href="почта.рф" rel="noreferrer nofollow noopener external" target="_blank">Почта России</a>
    </body></html>`;
    expect(externalLinks(content, outputPath)).toBe(result);
  });

  test('External links IDN ko', () => {
    const outputPath = 'test.html';
    const content = `<!doctype html><html><head>
    </head><body>
    <a href="https://한국인터넷정보센터.한국">Korea Internet Information Center</a>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <a href="https://한국인터넷정보센터.한국" rel="noreferrer nofollow noopener external" target="_blank">Korea Internet Information Center</a>
    </body></html>`;
    expect(externalLinks(content, outputPath)).toBe(result);
  });

  test('External links rel:[noreferrer]', () => {
    const outputPath = 'test.html';
    const config = {
      rel: 'noreferrer',
    };
    const content = `<!doctype html><html><head>
    </head><body>
    <a href="www.google.com">Google</a>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });

  test('External links overwrite:false', () => {
    const outputPath = 'test.html';
    const config = {
      overwrite: false,
    };
    const content = `<html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer">Google</a>
    </body></html>`;
    const result = `<!doctype html><html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });

  test('External links overwrite:false addDoctype: false', () => {
    const outputPath = 'test.html';
    const config = {
      overwrite: false,
      addDoctype: false,
    };
    const content = `<html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer">Google</a>
    </body></html>`;
    const result = `<html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });

  test('External links overwrite:false doctype: html 4 strict', () => {
    const outputPath = 'test.html';
    const config = {
      overwrite: false,
      rel: 'noreferrer',
      doctype: `< !DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd" >`,
    };
    const content = `<html><head>
    </head><body>
    <a href="www.google.com">Google</a>
    </body></html>`;
    const result = `< !DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
  "http://www.w3.org/TR/html4/strict.dtd" ><html><head>
    </head><body>
    <a href="www.google.com" rel="noreferrer" target="_blank">Google</a>
    </body></html>`;
    expect(externalLinks(content, outputPath, config)).toBe(result);
  });
});
