'use strict';

const parseURL = require('../src/parseURL');

test('Get protocols', () => {
  expect(parseURL('http://www.example.com/path').groups.protocol).toBe('http:');
  expect(parseURL('https://ru.wikipedia.org/wiki/URI').groups.protocol).toBe('https:');
  expect(parseURL('ftp://ftp.is.co.za/rfc/rfc1808.txt').groups.protocol).toBe('ftp:');
  expect(parseURL('file://C:\\UserName.HostName\\Projects\\Wikipedia_Articles\\URI.xml').groups.protocol).toBe('file:');
  expect(parseURL('ldap://[2001:db8::7]/c=GB?objectClass?one').groups.protocol).toBe('ldap:');
  expect(parseURL('mailto:John.Doe@example.com').groups.protocol).toBe('mailto:');
  expect(parseURL('sip:911@pbx.mycompany.com').groups.protocol).toBe('sip:');
  expect(parseURL('telnet://192.0.2.16:80/').groups.protocol).toBe('telnet:');
  expect(parseURL('urn:oasis:names:specification:docbook:dtd:xml:4.1.2').groups.protocol).toBe('urn:');
  expect(parseURL('//www.example.com/path').groups.protocol).toBeUndefined();
  expect(parseURL('www.example.com/path').groups.protocol).toBeUndefined();
  expect(parseURL('/path').groups.protocol).toBeUndefined();
  expect(parseURL('#id').groups.protocol).toBeUndefined();
  expect(parseURL('../index.php#id').groups.protocol).toBeUndefined();
});

test('Get hostname', () => {
  expect(parseURL('').groups.hostname).toBeUndefined();
  expect(parseURL().groups.hostname).toBeUndefined();
  expect(parseURL(null).groups.hostname).toBeUndefined();
  expect(parseURL('http://www.example.com/path').groups.hostname).toBe('www.example.com');
  expect(parseURL('http://example.com/path').groups.hostname).toBe('example.com');
  expect(parseURL('https://www.e-x-a-m-p-l-e.com/path').groups.hostname).toBe('www.e-x-a-m-p-l-e.com');
  expect(parseURL('https://192.168.0.1:8080/path').groups.hostname).toBe('192.168.0.1');
  expect(parseURL('ftp://www.example.com/path').groups.hostname).toBe('www.example.com');
  expect(parseURL('//www.example.com/path').groups.hostname).toBe('www.example.com');
  expect(parseURL('www.example.com/path').groups.hostname).toBe('www.example.com');
  expect(parseURL('example.com').groups.hostname).toBe('example.com');
  expect(parseURL('/index.html').groups.hostname).toBeUndefined();
  expect(parseURL('../index.html').groups.hostname).toBeUndefined();
  expect(parseURL('./index.html').groups.hostname).toBeUndefined();
  expect(parseURL('#index').groups.hostname).toBeUndefined();
  expect(parseURL('?query=index').groups.hostname).toBeUndefined();
});
