'use strict';

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

  return ['http', 'https', 'ftp', 'ftps', null].filter((element) => !exclProto.includes(element));
};

module.exports = getAllowedProtocols;
