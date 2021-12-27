/**
 * Get hostname from url or link
 * @param {string} url link or url string
 * @param {string|array} excludedProtocols protocol(s) without colon
 * @return {string|boolean} hostname or false
 */
function getHostname(url, excludedProtocols = []) {
  url = (url !== null && url !== undefined) ? url.toLowerCase() : '';
  excludedProtocols = excludedProtocols.concat(['tel', 'mailto']);
  const notHostname = ['', null, '..', '.'];
  const [protocol] = url.includes(':') ? url.split(':') : 'none';
  let hostname = false;

  if (!excludedProtocols.includes(protocol)) {
    const regex = new RegExp('^(?:\\w*.?\\/\\/)?([^\\/#\\?]*)\\/?', 'g');
    try {
      hostname = regex.exec(url)[1];
    } catch (e) {
      hostname = false;
    } finally {
      hostname = notHostname.includes(hostname) ? false : hostname;
    }
  }
  return hostname;
}

module.exports = getHostname;
