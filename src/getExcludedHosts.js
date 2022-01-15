'use strict';

const getHostname = require('./getHostname');
/**
 * getExcludedHosts
 * Get hostnames and remove duplicates
 * @param {array|string} urls
 * @return {array} hosts
 */
const getExcludedHosts = (urls) => {
  const safeUrls = Array.isArray(urls) ? urls : [urls];
  return safeUrls.
      map((el) => getHostname(el)).
      filter((el, pos, arr) => el && arr.indexOf(el) === pos);
};

module.exports = getExcludedHosts;
