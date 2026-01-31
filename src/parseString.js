const re = /[,;\s]/u;

/**
 * Parse string of values
 * @param {string} param
 * @return {array}
 */
export default (param = '') => {
  if (!param) {
    return [];
  }
  const safeParam = param.trim();

  return (safeParam[0] === '[' && safeParam[safeParam.length - 1] === ']') ?
    JSON.parse(safeParam).map((e) => e.trim()).filter((e) => e) :
    safeParam.split(re).map((e) => e.trim()).filter((e) => e);
};
