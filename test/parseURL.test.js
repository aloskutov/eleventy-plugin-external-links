'use strict';

const parseURL = require('../src/parseURL');

describe('Test #1. Get protocols. Defined', () => {
  test.each([
    {url: 'http://www.example.com/path', expected: 'http:'},
    {url: 'https://ru.wikipedia.org/wiki/URI', expected: 'https:'},
    {url: 'ftp://ftp.is.co.za/rfc/rfc1808.txt', expected: 'ftp:'},
    {url: 'file://C:\\UserName.HostName\\Projects\\Wikipedia_Articles\\URI.xml', expected: 'file:'},
    {url: 'ldap://[2001:db8::7]/c=GB?objectClass?one', expected: 'ldap:'},
    {url: 'mailto:John.Doe@example.com', expected: 'mailto:'},
    {url: 'sip:911@pbx.mycompany.com', expected: 'sip:'},
    {url: 'telnet://192.0.2.16:80/', expected: 'telnet:'},
    {url: 'urn:oasis:names:specification:docbook:dtd:xml:4.1.2', expected: 'urn:'},
  ])('parseUrl($url).groups.protocol', ({url, expected}) => {
    expect(parseURL(url).groups.protocol).toBe(expected);
  });
});

describe('Test #2. Get protocols. Undefined', () => {
  test.each([
    {url: '//www.example.com/path'},
    {url: 'www.example.com/path'},
    {url: '/path'},
    {url: '/path/'},
    {url: 'path/'},
    {url: '#id'},
    {url: '../index.php#id'},
    {url: 'почта.рф'},
  ])('parseUrl($url).groups.protocol', ({url}) => {
    expect(parseURL(url).groups.protocol).toBeUndefined();
  });
});

describe('Test #3. Get hostname. Defined', () => {
  test.each([
    {
      url: 'http://[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]/',
      expected: '[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]',
    },
    expect(parseURL(url).groups.hostname).toBe(expected);
  });
});

describe('Test #4. Get hostname. Undefined', () => {
  test.each([
    {url: null},
    {},
    {url: ''},
    {url: '/index.html'},
    {url: './index.html'},
    {url: '#index'},
    {url: '?query=index'},
    {url: '/somepath/'},
    {url: '/somepath'},
  ])('parseUrl($url).groups.hostname', ({url}) => {
    expect(parseURL(url).groups.hostname).toBeUndefined();
  });
});
