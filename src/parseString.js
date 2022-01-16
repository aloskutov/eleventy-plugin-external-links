'use strict';

const re = /[,;\s]/;

/**
 * Parse string of values
 * @param {string} param
 * @return {array}
 */
const parseString = (param = '') => {
  if (!param) return [];
  const safeParam = param.trim();

  if (safeParam[0] === '[' && safeParam[safeParam.length - 1] === ']') {
    return JSON.parse(safeParam).map((e) => e.trim()).filter((e) => e);
  } else {
    return safeParam.split(re).map((e) => e.trim()).filter((e) => e);
  }
};

module.exports = parseString;
