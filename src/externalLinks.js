'use strict';

const {parse} = require('node-html-parser');
const path = require('path');

const parseOptions = require('./parseOptions');
const getExcludedHosts = require('./getExcludedHosts');
const getHostname = require('./getHostname');
const parseString = require('./parseString');
const {getOptionRel, concatRel} = require('./handlerRel');

const defaultOptions = {
  url: '',
  selector: 'a',
  rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
  target: '_blank',
  overwrite: true,
  excludedProtocols: [],
  doctype: '<!doctype html>',
  addDoctype: false,
  ext: ['.html'],
  excludedDomains: [],
  enableTarget: true,
};

/**
 * Checks if a file extension matches
 * @param {string} ext file extension
 * @param {object} options
 * @return {boolean}
 */
const extensionMatches = (ext, options) => {
  const extensions = Array.isArray(options.ext) ?
    options.ext :
    parseString(options.ext);
  const safeExt = ext;

  return extensions.includes(safeExt);
};

/**
 * Should Change Attributes
 * @param {string} link
 * @param {object} options
 * @return {boolean}
 */
const shouldChangeAttributes = (link, options) => {
  const hostname = getHostname(options.url);
  const linkHostname = getHostname(link, options.excludedProtocols);
  const excludedHosts = getExcludedHosts(options.excludedDomains);

  return (
    linkHostname &&
    linkHostname !== hostname &&
    !excludedHosts.includes(linkHostname)
  );
};

const setTargetAttribute = (link, options) => {
  if (options.enableTarget) {
    if (options.overwrite) {
      link.setAttribute('target', options.target);
    } else {
      link.setAttribute('target', link.getAttribute('target') || options.target);
    }
  }
};

/**
 * Change attributes
 * @param {object} link
 * @param {object} options
 */
const changeAttributes = (link, options) => {
  if (options.overwrite) {
    link.setAttribute('rel', concatRel(link.getAttribute('rel'), getOptionRel(options.rel)));
  } else {
    link.setAttribute('rel', link.getAttribute('rel') || getOptionRel(options.rel));
  }
  setTargetAttribute(link, options);
};

/**
 * Get result
 * @param {object} document
 * @param {object} options
 * @returns
 */
const getResult = (document, options) => {
  return options.addDoctype ?
    `${options.doctype}${document.outerHTML}` :
    `${document.outerHTML}`;
};

/**
 * External links
 * @param {string} content
 * @param {string} outputPath
 * @param {object} globalOptions
 * @return {string} content
 */
module.exports = function(content, outputPath, globalOptions = {}) {
  const options = parseOptions(defaultOptions, globalOptions);
  if (!outputPath || !extensionMatches(path.extname(outputPath), options)) {
    return content;
  }

  const document = parse(content);
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const linkHref = link.getAttribute('href');

    if (shouldChangeAttributes(linkHref, options)) {
      changeAttributes(link, options);
    }
  });

  return getResult(document, options);
};
