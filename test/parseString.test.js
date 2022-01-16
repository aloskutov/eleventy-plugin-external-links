'use strict';

const parseString = require('../src/parseString');

test('Empty & Undefined', () => {
  expect(parseString()).toStrictEqual([]);
  expect(parseString(null)).toStrictEqual([]);
  expect(parseString('')).toStrictEqual([]);
  expect(parseString(',, ,;;;;;;;,,;;;;;; ,,,,,,;;;;;;,, ,,,;;;;;;,,,,,,')).toStrictEqual([]);
  expect(parseString('        ,              ;              ;           \t              \n')).toStrictEqual([]);
});

test('JSON', () => {
  expect(parseString('[".html", ".htm"]')).toStrictEqual(['.html', '.htm']);
  expect(parseString('["www.example.com", "blog.example.com", "admin.example.com"]')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('["noreferrer", "nofollow", "noopener", "external"]')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('["ftp", "ftps"]')).toStrictEqual(['ftp', 'ftps']);
});

test('String', () => {
  expect(parseString('.html')).toStrictEqual(['.html']);
  expect(parseString('www.example.com')).toStrictEqual(['www.example.com']);
  expect(parseString('noreferrer')).toStrictEqual(['noreferrer']);
  expect(parseString('ftp')).toStrictEqual(['ftp']);
});

test('String. Comma separated', () => {
  expect(parseString('.html, .htm ')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com,blog.example.com, admin.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('noreferrer, nofollow,noopener, external')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp, ftps')).toStrictEqual(['ftp', 'ftps']);
});

test('String. Semicolon separated', () => {
  expect(parseString('.html; .htm')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com;blog.example.com; admin.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('noreferrer; nofollow;noopener; external')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp; ftps')).toStrictEqual(['ftp', 'ftps']);
});

test('String. Space separated', () => {
  expect(parseString('.html .htm')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com blog.example.com admin.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('noreferrer nofollow noopener external')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp ftps')).toStrictEqual(['ftp', 'ftps']);
});

test('String. Tab separated', () => {
  expect(parseString('.html\t.htm')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com\tblog.example.com\tadmin.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('noreferrer\tnofollow\tnoopener\texternal')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp\tftps')).toStrictEqual(['ftp', 'ftps']);
});

test('String. New line separated', () => {
  expect(parseString('.html\n.htm')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com\nblog.example.com\nadmin.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com']);
  expect(parseString('noreferrer\nnofollow\nnoopener\nexternal')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp\nftps')).toStrictEqual(['ftp', 'ftps']);
});

test('String. Mixed', () => {
  expect(parseString('.html\n.htm')).toStrictEqual(['.html', '.htm']);
  expect(parseString('www.example.com\nblog.example.com, admin.example.com\twww-test.example.com')).toStrictEqual(['www.example.com', 'blog.example.com', 'admin.example.com', 'www-test.example.com']);
  expect(parseString('noreferrer,nofollow;noopener\nexternal')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('ftp\nftps')).toStrictEqual(['ftp', 'ftps']);
});

test('Empty spaces', () => {
  expect(parseString('["   .html  ", ".htm"   ]     ')).toStrictEqual(['.html', '.htm']);
  expect(parseString('["noreferrer", "nofollow", "noopener", "external"]')).toStrictEqual(['noreferrer', 'nofollow', 'noopener', 'external']);
  expect(parseString('[ "  ftp  ", "  ftps " ]')).toStrictEqual(['ftp', 'ftps']);
  expect(parseString('     .html\n.htm       ')).toStrictEqual(['.html', '.htm']);
});
