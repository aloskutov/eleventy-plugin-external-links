'use strict';

const getExcludedHosts = require('../src/getExcludedHosts');

describe('Test #1. Emplty values', () => {
  test.each([
    {url: undefined, expected:[] },
    {url: null, expected:[] },
    {url: false, expected:[] },
    {url: [], expected:[] },
  ])('getExcludedHosts($url)', ({url, expected}) => {
    expect(getExcludedHosts(url)).toEqual(expect.arrayContaining(expected));
  });
});

describe('Test #2. String', () => {
  test.each([
    {url: 'https://www.example.com', expected:['www.example.com']},
    {url: '//www.example.com', expected:['www.example.com']},
    {url: 'www.example.com', expected:['www.example.com']},
    {url: '/index.html', expected:[]},
    {url: './index.html', expected:[]},
    {url: '../index.html', expected:[]},
    {url: '../index.html?query=test', expected:[]},
    {url: '?query=test', expected:[]},
    {url: 'tel:+79123456789', expected:[]},
    {url: 'mailto:user@example.com', expected:[]}
  ])('getExcludedHosts($url)', ({url, expected}) => {
    expect(getExcludedHosts(url)).toEqual(expect.arrayContaining(expected));
  });
});

describe('Test #3: String: domain list', () => {
  test.each([
    {url: 'www.example.com, blog.example.com, admin.example.com', expected: ['www.example.com', 'blog.example.com', 'admin.example.com']},
    {url: 'http://www.example.com; https://blog.example.com; //admin.example.com', expected: ['www.example.com', 'blog.example.com', 'admin.example.com']},
    {url: 'www.example.com blog.example.com admin.example.com mailto:user@example.com', expected: ['www.example.com', 'blog.example.com', 'admin.example.com']},
    {url: ['www.example.com', 'blog.example.com', 'admin.example.com'], expected: ['www.example.com', 'blog.example.com', 'admin.example.com']},
    {url: 'www.example.com\n\nblog.example.com\nadmin.example.com', expected: ['www.example.com', 'blog.example.com', 'admin.example.com']}
  ])('getExcludedHosts($url)', ({url, expected}) => {
    expect(getExcludedHosts(url)).toEqual(expect.arrayContaining(expected));
  });
});

describe('Test #4: Array', () => {
  test.each([
    {url: ['https://www.example.com', '//test.com', 'tel:+79123456789', 'mailto:user@example.com', '//www.example.com/'], expected: ['www.example.com', 'test.com']},
    {url: ['www.example.com', 'blog.example.com', 'admin.example.com'], expected: ['www.example.com', 'blog.example.com', 'admin.example.com']},
  ])('getExcludedHosts($url)', ({url, expected}) => {
    expect(getExcludedHosts(url)).toEqual(expect.arrayContaining(expected));
  });
});

