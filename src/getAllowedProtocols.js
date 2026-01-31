const allowedProtocols = ['http', 'https', 'ftp', 'ftps', null];

/**
 * Get all allowed protocols by default
 * @return {array} protocols
 */
export const getProtocols = () => allowedProtocols;

/**
 * Get allowed protocols
 * @param {array|string} excludedProtocols
 * @return {array} allowed protocols
 */
export const getAllowedProtocols = (excludedProtocols) => {
  const exclProto = Array.isArray(excludedProtocols) ?
    excludedProtocols.map((element) => (
      element ? element.toLowerCase() : element
    )) :
    excludedProtocols ? [excludedProtocols.toLowerCase()] : [excludedProtocols];

  return allowedProtocols.filter((element) => !exclProto.includes(element));
};

export default getAllowedProtocols;
