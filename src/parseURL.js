'use strict';

/**
 * Parse URL
 * @param {string} url href link
 * @return {array} result
 * result indexes: [protocol, hostname, port, pathname, query string or id]
 */
const parseURL = (url) =>{
  const checkedUrl = url ? url.toLowerCase() : '';
  const regex = /^(?<protocol>\w*(?::))?(?:\/\/)?(?<hostname>[a-zA-Z0-9.-]+)?(?::)?(?<port>\d+)?(?<path>\/?[\w/.]*\/?)*(?<query>\S*)/;
  const matches = regex.exec(checkedUrl);

  return matches;
};

module.exports = parseURL;
