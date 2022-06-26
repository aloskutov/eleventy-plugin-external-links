'use strict';

/**
 * Get rel string
 * @param {array|string} rel attribute rel
 * @return {string}
 */
const getOptionRel = (rel = '') => {
  return Array.isArray(rel) ? rel.join(' ') : rel;
};

/**
 * Removes empty values
 * @param {array} arr
 * @returns {array}
 */
const cleanArray = (arr) => {
  return arr.filter((el) => el !== '');
};

/**
 * Concatenates the strings of the Rel attribute value and
 * the given value, removing duplicates.
 *
 * @param {string} attr attribute value from link
 * @param {string} rel value from options
 * @returns {string}
 */
const concatRel = (attr, rel) => {
  const arrAttr = attr ? attr.toLowerCase().split(' ') : [];
  const arrRel = rel ? rel.toLowerCase().split(' ') : [];
  const arrResult = cleanArray([... new Set(arrAttr.concat(arrRel))]);
  return arrResult.join(' ');
};

module.exports = {getOptionRel, concatRel};
