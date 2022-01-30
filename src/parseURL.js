'use strict';

/**
 * Parse URL
 * @param {string} url href link
 * @return {array} result
 * result indexes: [groups][protocol, hostname]
 */
const parseURL = (url) =>{
  const checkedUrl = url ? url.toLowerCase() : '';
  const regex = /^(?<protocol>\w{0,25}(?::)){0,1}(?:\/\/){0,1}(?:(?:\S{0,255}){0,1}(?:@)){0,1}(?<hostname>[\p{L}\p{N}][\p{L}\p{N}.-]{0,252}[\p{L}\p{N}]){0,1}/u;
  const matches = regex.exec(checkedUrl);

  return matches;
};

module.exports = parseURL;
