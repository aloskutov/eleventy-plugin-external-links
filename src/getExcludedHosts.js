import getHostname from './getHostname.js';
import parseString from './parseString.js';

/**
 * getExcludedHosts
 * Get hostnames and remove duplicates
 * @param {array|string} urls
 * @return {array} hosts
 */
export default (urls) => {
  const safeUrls = Array.isArray(urls) ? urls : urls ? parseString(urls) : [];

  return safeUrls.
    map((el) => getHostname(el)).
    filter((el, pos, arr) => el && arr.indexOf(el) === pos);
};
