'use strict';

const allowedProtocols = ['http', 'https', 'ftp', 'ftps', null];

/**
 * Get all allowed protocols by default
 * @return {array} protocols
 */
const getProtocols = () => allowedProtocols;

/**
 * Get allowed protocols
 * @param {array|string} excludedProtocols
 * @return {array} allowed protocols
 */
const getAllowedProtocols = (excludedProtocols) => {
  const exclProto = Array.isArray(excludedProtocols) ?
    excludedProtocols.map((element) =>
      (element ? element.toLowerCase() : element)) :
      excludedProtocols ?
        [excludedProtocols.toLowerCase()] :
        [excludedProtocols];

  return allowedProtocols.filter((element) => !exclProto.includes(element));
};

module.exports = {getAllowedProtocols, getProtocols};
