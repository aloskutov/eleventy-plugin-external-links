'use strict';

const {JSDOM} = require('jsdom');
const path = require('path');

const parseOptions = require('./parseOptions');
const getExcludedHosts = require('./getExcludedHosts');
const getHostname = require('./getHostname');
const parseString = require('./parseString');

const defaultOptions = {
  url: '',
  selector: 'a',
  rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
  target: '_blank',
  overwrite: true,
  excludedProtocols: [],
  doctype: '<!doctype html>',
  addDoctype: true,
  ext: ['.html'],
  excludedDomains: [],
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

/**
 * get rel string
 * @param {array|string} rel attribute rel
 * @return {string}
 */
const getOptionRel = (rel) => {
  return Array.isArray(rel) ? rel.join(' ') : rel;
};

/**
 * Change attributes
 * @param {object} link
 * @param {object} options
 */
const changeAttributes = (link, options) => {
  if (options.overwrite) {
    link.setAttribute('rel', getOptionRel(options.rel));
    link.setAttribute('target', options.target);
  } else {
    link.setAttribute('rel', link.getAttribute('rel') || getOptionRel(options.rel));
    link.setAttribute('target', link.getAttribute('target') || options.target);
  }
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

  const dom = new JSDOM(content);
  const document = Object.assign(dom.window.document);
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const linkHref = link.getAttribute('href');

    if (shouldChangeAttributes(linkHref, options)) {
      changeAttributes(link, options);
    }
  });

  const result = options.addDoctype ?
    `${options.doctype}${document.documentElement.outerHTML}` :
    `${document.documentElement.outerHTML}`;

  return result;
};
