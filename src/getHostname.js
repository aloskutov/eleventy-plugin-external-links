import parseURL from './parseURL.js';
import getAllowedProtocols from './getAllowedProtocols.js';

/**
 * Get hostname from url or link
 * @param {string} url link or url string
 * @param {string|array} excludedProtocols protocol(s) without colon
 * @return {string|boolean} hostname or false
 */
export default function getHostname(url = '', excludedProtocols = []) {
  const parsed = parseURL(url);
  const allowedProtocols = getAllowedProtocols(excludedProtocols);
  const protocol = parsed.groups.protocol ?
    parsed.groups.protocol.slice(0, -1) :
    null;
  let hostname = parsed.groups.hostname ? parsed.groups.hostname : false;

  hostname = allowedProtocols.includes(protocol) ? hostname : false;

  return hostname;
}
