'use strict';

const {JSDOM} = require('jsdom');
const getHostname = require('./getHostname');

module.exports = function(content, outputPath, globalOptions = {}) {
  try {
    if (!outputPath.endsWith('.html')) {
      return content;
    }
  } catch (e) {
    if (e instanceof TypeError) {
      return content;
    }
  }

  const options = Object.assign({
    url: '',
    selector: 'a',
    rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
    target: '_blank',
    overwrite: true,
    excludedProtocols: [],
    doctype: '<!doctype html>',
    addDoctype: true,
  }, globalOptions);

  const hostname = getHostname(options.url);
  const dom = new JSDOM(content);
  const document = Object.assign(dom.window.document);
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const linkHostname = getHostname(link.getAttribute('href'), options.excludedProtocols);
    const linkRel = link.getAttribute('rel');
    const linkTarget = link.getAttribute('target');
    const rel = Array.isArray(options.rel) ? options.rel.join(' ') : options.rel;

    if (linkHostname && linkHostname !== hostname) {
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
