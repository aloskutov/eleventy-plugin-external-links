'use strict';

/**
 * Parse URL
 * @param {string} url href link
 * @return {array} result
 * result indexes: [protocol, hostname, port, pathname, query string or id]
 */
function parseURL(url = '') {
  const regex = new RegExp('^(\\w*\\:)?(?:\\/\\/)?([a-zA-Z0-9\\.]+)?(?::)?(\\d+)?(\\/?[\\w\\.]*\\/?)*(\\S*)', 'g');
  return regex.exec(url);
}

/**
 * Get hostname from url or link
 * @param {string} url link or url string
 * @param {string|array} excludedProtocols protocol(s) without colon
 * @return {string|boolean} hostname or false
 */
function getHostname(url, excludedProtocols = []) {
  url = (url !== null && url !== undefined) ? url.toLowerCase() : '';
  if (Array.isArray(excludedProtocols)) {
    excludedProtocols = excludedProtocols
        .map((element) => element.toLowerCase());
  }
  if (typeof excludedProtocols === 'string') {
    excludedProtocols = excludedProtocols.toLowerCase();
  }

  if (!excludedProtocols.includes(protocol)) {
    const regex = new RegExp('^(?:\\w*.?\\/\\/)?([^\\/#\\?]*)\\/?', 'g');
    hostname = regex.exec(url)[1];
    hostname = notHostname.includes(hostname) ? false : hostname;
  }
  return hostname;
}

module.exports = getHostname;
