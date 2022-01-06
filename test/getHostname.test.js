'use strict';

const getHostname = require('../src/getHostname');

test('Hostname with empty string', () => {
  const url = '';
  expect(getHostname(url)).toBeFalsy();
  expect(getHostname(url)).not.toBeNull();
  expect(getHostname(url)).not.toBeUndefined();
  expect(getHostname(url)).not.toBeTruthy();
});

test('Hostname with null', () => {
  const url = null;
  expect(getHostname(url)).toBeFalsy();
  expect(getHostname(url)).not.toBeNull();
  expect(getHostname(url)).not.toBeUndefined();
  expect(getHostname(url)).not.toBeTruthy();
});

test('Hostname with undefined', () => {
  expect(getHostname()).toBeFalsy();
  expect(getHostname()).not.toBeNull();
  expect(getHostname()).not.toBeUndefined();
  expect(getHostname()).not.toBeTruthy();
});

test('Hostname is IP address', () => {
  const url = 'http://8.8.8.8/';
  expect(getHostname(url)).toBe('8.8.8.8');
});

test('Hostname is IP address, without protocol', () => {
  const url = '8.8.8.8';
  expect(getHostname(url)).toBe('8.8.8.8');
});

test('Hostname with https: protocol', () => {
  const url = 'https://www.example.com/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname with https: protocol & port', () => {
  const url = 'https://www.example.com:443/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname with http: protocol', () => {
  const url = 'http://www.example.com/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname with http: protocol & port', () => {
  const url = 'http://www.example.com:8080/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname with ftp: protocol', () => {
  const url = 'ftp://www.example.com/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname with ftp: protocol, exclude ftp protocol', () => {
  const url = 'ftp://www.example.com/path';
  const excludedProtocol = 'Ftp';
  expect(getHostname(url, excludedProtocol)).toBeFalsy();
});

test('Hostname with ftp: protocol, exclude ftp & gopher protocol', () => {
  const url = 'ftp://www.example.com/path';
  const excludedProtocol = ['Ftp', 'gopher'];
  expect(getHostname(url, excludedProtocol)).toBeFalsy();
});

test('Hostname with mailto: protocol', () => {
  const url = 'mailto:mail@expample.com';
  expect(getHostname(url)).toBeFalsy();
});

test('Hostname with tel: protocol', () => {
  const url = 'tel:+1234567890';
  expect(getHostname(url)).toBeFalsy();
});

test('Hostname with file: protocol', () => {
  const url = 'file:/some/file.ext';
  expect(getHostname(url)).toBeFalsy();
});

test('Hostname without protocol 1', () => {
  const url = '//www.example.com/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname without protocol 2', () => {
  const url = 'www.example.com/path';
  expect(getHostname(url)).toBe('www.example.com');
});

test('Hostname without protocol and with hyphens', () => {
  const url = 'w-w-w.e-x-a-m-p-l-e.com/path';
  expect(getHostname(url)).toBe('w-w-w.e-x-a-m-p-l-e.com');
});

test('Link without hostname', () => {
  const url = '/path';
  expect(getHostname(url)).toBeFalsy();
});

test('Link without hostname, with id', () => {
  const url = '#path';
  expect(getHostname(url)).toBeFalsy();
});

test('Link without hostname, with query string', () => {
  const url = '?query-string=0';
  expect(getHostname(url)).toBeFalsy();
});

test('Link without hostname, with relative path ..', () => {
  const url = '../sibling-folder/index.html';
  expect(getHostname(url)).toBeFalsy();
});

test('Link without hostname, with relative path ./', () => {
  const url = './some-path/index.html';
  expect(getHostname(url)).toBeFalsy();
});
