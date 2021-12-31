'use strict';

/**
 * Parse URL
 * @param {string} url href link
 * @return {array} result
 * result indexes: [protocol, hostname, port, pathname, query string or id]
 */
function parseURL(url) {
  const checkedUrl = (url !== null) ? url.toLowerCase() : '';
  const regex = /^(?<protocol>\w*(?:\:))?(?:\/\/)?(?<hostname>[a-zA-Z0-9\.-]+)?(?:\:)?(?<port>\d+)?(?<path>\/?[\w\.]*\/?)*(?<query>\S*)/;
  const matches = regex.exec(checkedUrl);

  return matches;
}

/**
 * Get allowed protocols
 * @param {array|string} excludedProtocols
 * @return {array} allowed protocols
 */
function getAllowedProtocols(excludedProtocols) {
  let exclProto = excludedProtocols;
  if (Array.isArray(exclProto )) {
    exclProto  = exclProto
        .map((element) => element.toLowerCase());
  }
  if (typeof exclProto  === 'string') {
    exclProto  = exclProto .toLowerCase();
  }
  return ['http', 'https', 'ftp', `ftps`, null].filter((element) => !exclProto .includes(element));
}

/**
 * Get hostname from url or link
 * @param {string} url link or url string
 * @param {string|array} excludedProtocols protocol(s) without colon
 * @return {string|boolean} hostname or false
 */
function getHostname(url = '', excludedProtocols = []) {
  const parsed = parseURL(url);
  const protocol = parsed.groups.protocol ? parsed.groups.protocol.slice(0, -1) : null;
  let hostname = parsed.groups.hostname ? parsed.groups.hostname : null;

  if (getAllowedProtocols(excludedProtocols).includes(protocol)) {
    hostname = [null, '..', '.'].includes(hostname) ? false : hostname;
  } else {
    hostname = false;
  }

  return hostname;
}

module.exports = getHostname;
