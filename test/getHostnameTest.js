'use strict';

const test = require('ava');
const getHostname = require('../src/getHostname');

test('Hostname with empty string', (t) => {
  const url = '';
  t.is(getHostname(url), false);
});

test('Hostname with null', (t) => {
  const url = null;
  t.is(getHostname(url), false);
});

test('Hostname with undefined', (t) => {
  t.is(getHostname(), false);
});

test('Hostname is IP address', (t) => {
  const url = 'http://8.8.8.8/';
  t.is(getHostname(url), '8.8.8.8');
});

test('Hostname is IP address, without protocol', (t) => {
  const url = '8.8.8.8';
  t.is(getHostname(url), '8.8.8.8');
});

test('Hostname with https: protocol', (t) => {
  const url = 'https://www.example.com/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname with https: protocol & port', (t) => {
  const url = 'https://www.example.com:443/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname with http: protocol', (t) => {
  const url = 'http://www.example.com/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname with http: protocol & port', (t) => {
  const url = 'http://www.example.com:8080/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname with ftp: protocol', (t) => {
  const url = 'ftp://www.example.com/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname with ftp: protocol, exclude ftp protocol', (t) => {
  const url = 'ftp://www.example.com/path';
  const excludedProtocol = 'Ftp';
  t.is(getHostname(url, excludedProtocol), false);
});

test('Hostname with ftp: protocol, exclude ftp & gopher protocol', (t) => {
  const url = 'ftp://www.example.com/path';
  const excludedProtocol = ['Ftp', 'gopher'];
  t.is(getHostname(url, excludedProtocol), false);
});

test('Hostname with mailto: protocol', (t) => {
  const url = 'mailto:mail@expample.com';
  t.is(getHostname(url), false);
});

test('Hostname with tel: protocol', (t) => {
  const url = 'tel:+1234567890';
  t.is(getHostname(url), false);
});

test('Hostname with file: protocol', (t) => {
  const url = 'file:/some/file.ext';
  t.is(getHostname(url), false);
});

test('Hostname without protocol 1', (t) => {
  const url = '//www.example.com/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Hostname without protocol 2', (t) => {
  const url = 'www.example.com/path';
  t.is(getHostname(url), 'www.example.com');
});

test('Link without hostname', (t) => {
  const url = '/path';
  t.is(getHostname(url), false);
});

test('Link without hostname, with id', (t) => {
  const url = '#path';
  t.is(getHostname(url), false);
});

test('Link without hostname, with query string', (t) => {
  const url = '?query-string=0';
  t.is(getHostname(url), false);
});

test('Link without hostname, with relative path ..', (t) => {
  const url = '../sibling-folder/index.html';
  t.is(getHostname(url), false);
});

test('Link without hostname, with relative path ./', (t) => {
  const url = './some-path/index.html';
  t.is(getHostname(url), false);
});
