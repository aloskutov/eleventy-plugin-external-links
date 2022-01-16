'use strict';

const getAllowedProtocols= require('../src/getAllowedProtocols');

const allowedProtocols = ['http', 'https', 'ftp', 'ftps', null];

describe('Allowed procols', () => {
  it('Test #1', () => {
    expect(getAllowedProtocols()).toEqual(allowedProtocols);
    expect(getAllowedProtocols([])).toEqual(allowedProtocols);
    expect(getAllowedProtocols(null)).toEqual(['http', 'https', 'ftp', 'ftps']);
    expect(getAllowedProtocols(allowedProtocols)).toEqual([]);
    expect(getAllowedProtocols('FTP')).not.toContain('ftp');
    expect(getAllowedProtocols(['Ftp', 'ftps'])).not.toContain(['ftp', 'ftps']);
  });
});
