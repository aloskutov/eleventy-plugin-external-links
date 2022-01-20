'use strict';

const parseURL = require('./parseURL');
const {getAllowedProtocols} = require('./getAllowedProtocols');

/**
 * Get hostname from url or link
 * @param {string} url link or url string
 * @param {string|array} excludedProtocols protocol(s) without colon
 * @return {string|boolean} hostname or false
 */
function getHostname(url = '', excludedProtocols = []) {
  const parsed = parseURL(url);
  const protocol = parsed.groups.protocol ?
    parsed.groups.protocol.slice(0, -1) :
    null;
  let hostname = parsed.groups.hostname ? parsed.groups.hostname : false;

  hostname = getAllowedProtocols(excludedProtocols).includes(protocol) ?
    hostname :
    false;

  return hostname;
}

module.exports = getHostname;
