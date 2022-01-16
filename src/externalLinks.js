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

module.exports = function(content, outputPath, globalOptions = {}) {
  if (!outputPath) return content;

  const options = parseOptions(defaultOptions, globalOptions);

  if (!extensionMatches(path.extname(outputPath), options)) return content;

  const dom = new JSDOM(content);
  const document = Object.assign(dom.window.document);
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const linkHref = link.getAttribute('href');
    const linkRel = link.getAttribute('rel');
    const linkTarget = link.getAttribute('target');
    const rel = Array.isArray(options.rel) ? options.rel.join(' ') : options.rel;

    if (shouldChangeAttributes(linkHref, options)) {
      if (options.overwrite) {
        link.setAttribute('rel', rel);
        link.setAttribute('target', options.target);
      } else {
        link.setAttribute('rel', linkRel || rel);
        link.setAttribute('target', linkTarget || options.target);
      }
    }
  });

  const result = options.addDoctype ? `${options.doctype}${document.documentElement.outerHTML}` : `${document.documentElement.outerHTML}`;

  return result;
};
