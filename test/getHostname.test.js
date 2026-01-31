import getHostname from '../src/getHostname.js';

describe('Test #1. Hostname is IP address', () => {
  test.each([
    { url: 'http://8.8.8.8/', expected: '8.8.8.8' },
    {
      url: 'http://[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]/',
      expected: '[2001:0db8:11a3:09d7:1f34:8a2e:07a0:765d]',
    },
    { url: '8.8.8.8', expected: '8.8.8.8' },
  ])('getHostname($url)', ({ url, expected }) => {
    expect(getHostname(url)).toBe(expected);
  });
});

describe('Test #2. Hostname with protocol and port', () => {
  test.each([
    { url: 'https://www.example.com/path', expected: 'www.example.com' },
    { url: 'https://www.example.com:443/path', expected: 'www.example.com' },
    { url: 'http://www.example.com/path', expected: 'www.example.com' },
    { url: 'ftp://www.example.com/path', expected: 'www.example.com' },
    {
      url: 'w-w-w.e-x-a-m-p-l-e.com/path',
      expected: 'w-w-w.e-x-a-m-p-l-e.com',
    },
  ])('getHostname($url)', ({ url, expected }) => {
    expect(getHostname(url)).toBe(expected);
  });
});

describe('Test #3. Hostname with excluded protocols', () => {
  test.each([
    { url: 'ftp://www.example.com/path', excProtocols: ['Ftp', 'gopher'] },
    { url: 'data:text/plain;charset=iso-8859-7,%be%be%be' },
    { url: 'mailto:mail@expample.com' },
    { url: 'file:///C:/file.wsdl' },
    { url: 'tel:+1-816-555-1212' },
    { url: 'sip:911@pbx.mycompany.com' },
    { url: 'telnet://192.0.2.16:80/' },
    { url: 'myphotoapp:albumname?index=1' },
  ])('getHostname($url)', ({ url, excProtocols }) => {
    expect(getHostname(url, excProtocols)).toBeFalsy();
  });
});
