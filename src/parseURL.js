'use strict';

/**
 * Parse URL
 * @param {string} url href link
 * @return {array} result
 * result indexes: [groups][protocol, hostname]
 */
const parseURL = (url) =>{
  const checkedUrl = url ? url.toLowerCase() : '';
    /^(?<protocol>[\w][\w\d.+-]{0,128}(?::)){0,1}(?:\/\/){0,1}(?:(?<userInfo>[\w\d!$&'()*+,;=:]{1,127})@){0,1}(?<hostname>(?:\[[0-9a-f]{0,4}(?::[[0-9a-f]{0,4}){1,7}\])|(?:[0-9]{1,3}\.){3}[0-9]{1,3}|[\p{L}\p{N}][\p{L}\p{N}.-]{0,252}[\p{L}\p{N}]){0,1}/u;
  const matches = regex.exec(checkedUrl);

  return matches;
};

module.exports = parseURL;
