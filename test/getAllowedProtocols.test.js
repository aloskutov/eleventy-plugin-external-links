import {getAllowedProtocols, getProtocols} from '../src/getAllowedProtocols.js';

describe('Allowed procols', () => {
  it('Test #1 Empty params', () => {
    expect(getAllowedProtocols()).toEqual(getProtocols());
    expect(getAllowedProtocols('')).toEqual(getProtocols());
    expect(getAllowedProtocols([])).toEqual(getProtocols());
  });
  it('Test #2 Null', () => {
    expect(getAllowedProtocols(null)).toEqual(['http', 'https', 'ftp', 'ftps']);
    expect(getAllowedProtocols(null)).not.toContain(null);
  });
  it('Test #3 remove all protocols', () => {
    expect(getAllowedProtocols(getProtocols())).toEqual([]);
  });
  it('Test #4 string', () => {
    expect(getAllowedProtocols('FTP')).not.toContain('ftp');
    expect(getAllowedProtocols('FTP')).toContain(null);
  });
  it('Test #3 array', () => {
    expect(getAllowedProtocols(['Ftp', 'ftps'])).not.toContain(['ftp', 'ftps']);
    expect(getAllowedProtocols(['Ftp', 'ftps'])).toContain(null);
  });
});
