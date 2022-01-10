'use strict';

const getAllowedProtocols = require('../src/getAllowedProtocols');
const allowedProcotols = ['http', 'https', 'ftp', 'ftps', null];

describe('Allowed procols', () => {
  it('Test #1', () => {
    expect(getAllowedProtocols()).toEqual(allowedProcotols);
    expect(getAllowedProtocols([])).toEqual(allowedProcotols);
    expect(getAllowedProtocols(null)).toEqual(['http', 'https', 'ftp', 'ftps']);
    expect(getAllowedProtocols(allowedProcotols)).toEqual([]);
    expect(getAllowedProtocols('FTP')).not.toContain('ftp');
    expect(getAllowedProtocols(['Ftp', 'ftps'])).not.toContain(['ftp', 'ftps']);
  });
});
