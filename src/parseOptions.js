/**
 * Safe options
 * @param {object} options
 * @return {object|null}
 */
const safeOptions = (options) => {
  return (options && options.constructor === {}.constructor) ? options : null;
};

/**
 * Parse options
 * @param {object} defaultOptions
 * @param {object} userOptions
 * @return {object}
 */
export default function parseOptions (defaultOptions, userOptions) {
  const safeDefaultOptions = safeOptions(defaultOptions);
  const safeUserOptions = safeOptions(userOptions);

  return Object.assign({}, safeDefaultOptions, safeUserOptions);
};
