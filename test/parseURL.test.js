'use strict';

const parseURL = require('../src/parseURL');

describe('Test #1. Get protocols. Defined', () => {
  test.each([
    { url: 'http://www.example.com/path', expected: 'http:' },
    { url: 'https://ru.wikipedia.org/wiki/URI', expected: 'https:' },
    { url: 'ftp://ftp.is.co.za/rfc/rfc1808.txt', expected: 'ftp:' },
    {
      url: 'file://C:\\UserName.HostName\\Projects\\Wikipedia_Articles\\URI.xml',
      expected: 'file:',
    },
    { url: 'ldap://[2001:db8::7]/c=GB?objectClass?one', expected: 'ldap:' },
    { url: 'mailto:John.Doe@example.com', expected: 'mailto:' },
    { url: 'sip:911@pbx.mycompany.com', expected: 'sip:' },
    { url: 'telnet://192.0.2.16:80/', expected: 'telnet:' },
    {
      url: 'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
      expected: 'urn:',
    },
  ])('parseUrl($url).groups.protocol', ({ url, expected }) => {
    expect(parseURL(url).groups.protocol).toBe(expected);
  });
});

describe('Test #2. Get protocols. Undefined', () => {
  test.each([
    { url: '//www.example.com/path' },
    { url: 'www.example.com/path' },
    { url: '/path' },
    { url: '/path/' },
    { url: 'path/' },
    { url: '#id' },
    { url: '../index.php#id' },
    { url: 'почта.рф' },
  ])('parseUrl($url).groups.protocol', ({ url }) => {
    expect(parseURL(url).groups.protocol).toBeUndefined();
  });
});

describe('Test #3. Get hostname. Defined', () => {
  test.each([
    { url: 'http://www.example.com/path', expected: 'www.example.com' },
    { url: 'http://example.com/path', expected: 'example.com' },
    {
      url: 'https://www.e-x-a-m-p-l-e.com/path',
      expected: 'www.e-x-a-m-p-l-e.com',
    },
    { url: 'https://192.168.0.1:8080/path', expected: '192.168.0.1' },
    {
      url: 'http://[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]/',
      expected: '[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]',
    },
    { url: 'ftp://www.example.com/path', expected: 'www.example.com' },
    { url: '//www.example.com/path', expected: 'www.example.com' },
    { url: 'www.example.com/path', expected: 'www.example.com' },
    { url: 'example.com', expected: 'example.com' },
    { url: 'http://почта.рф', expected: 'почта.рф' },
    { url: 'http://яндекс.рф', expected: 'яндекс.рф' },
    {
      url: 'https://xn--d1acpjx3f.xn--p1ai/',
      expected: 'xn--d1acpjx3f.xn--p1ai',
    },
    {
      url: 'https://한국인터넷정보센터.한국/jsp/eng/domain/policy.jsp',
      expected: '한국인터넷정보센터.한국',
    },
  ])('parseUrl($url).groups.hostname', ({ url, expected }) => {
    expect(parseURL(url).groups.hostname).toBe(expected);
  });
});

describe('Test #4. Get hostname. Undefined', () => {
  test.each([
    { url: null },
    {},
    { url: '' },
    { url: '/index.html' },
    { url: './index.html' },
    { url: '#index' },
    { url: '?query=index' },
    { url: '/somepath/' },
    { url: '/somepath' },
  ])('parseUrl($url).groups.hostname', ({ url }) => {
    expect(parseURL(url).groups.hostname).toBeUndefined();
  });
});
