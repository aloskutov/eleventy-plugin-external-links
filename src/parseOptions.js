'use strict';

/**
 * Check options
 * @param {object} options
 * @return {object|null}
 */
const checkOptions = (options) => {
  return (options && options.constructor === {}.constructor) ? options : null;
};

/**
 * Parse options
 * @param {object} defaultOptions
 * @param {object|string} userOptions
 * @return {object}
 */
const parseOptions = (defaultOptions, userOptions) => {
  const safeDefaultOptions = checkOptions(defaultOptions);
  const safeUserOptions = checkOptions(userOptions);

  return Object.assign({}, safeDefaultOptions, safeUserOptions);
};

module.exports = parseOptions;
