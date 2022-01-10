'use strict';

const getHostname = require('../src/getHostname');

test('Hostname is IP address', () => {
  expect(getHostname('http://8.8.8.8/')).toBe('8.8.8.8');
  expect(getHostname('8.8.8.8')).toBe('8.8.8.8');
});

test('Hostname with protocol and port', () => {
  expect(getHostname('https://www.example.com/path')).toBe('www.example.com');
  expect(getHostname('https://www.example.com:443/path')).toBe('www.example.com');
  expect(getHostname('http://www.example.com/path')).toBe('www.example.com');
  expect(getHostname('http://www.example.com:8080/path')).toBe('www.example.com');
  expect(getHostname('ftp://www.example.com/path')).toBe('www.example.com');
  expect(getHostname('w-w-w.e-x-a-m-p-l-e.com/path')).toBe('w-w-w.e-x-a-m-p-l-e.com');
});

test('Hostname with excluded protocols', () => {
  expect(getHostname('ftp://www.example.com/path', ['Ftp', 'gopher'])).toBeFalsy();
  expect(getHostname('data:text/plain;charset=iso-8859-7,%be%be%be')).toBeFalsy();
  expect(getHostname('mailto:mail@expample.com')).toBeFalsy();
  expect(getHostname('file:///C:/file.wsdl')).toBeFalsy();
  expect(getHostname('tel:+1-816-555-1212')).toBeFalsy();
  expect(getHostname('sip:911@pbx.mycompany.com')).toBeFalsy();
  expect(getHostname('telnet://192.0.2.16:80/')).toBeFalsy();
  expect(getHostname('javascript:alert()')).toBeFalsy();
  expect(getHostname('myphotoapp:albumname?index=1')).toBeFalsy();
});
