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
  }, globalOptions);

  const urlHostname = getHostname(options.url);
  const dom = new JSDOM(content);
  const document = Object.assign(dom.window.document);
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const linkHref = link.getAttribute('href');
    const linkHostname = getHostname(linkHref, options.excludedProtocols);
    const linkRel = link.getAttribute('rel');
    const linkTarget = link.getAttribute('target');
    const rel = Array.isArray(options.rel) ? options.rel.join(' ') : options.rel;

    if (linkHostname && linkHostname !== urlHostname) {
      if (options.overwrite) {
        link.setAttribute('rel', rel);
        link.setAttribute('target', options.target);
      } else {
        link.setAttribute('rel', linkRel || rel);
        link.setAttribute('target', linkTarget || options.target);
      }
    }
  });
  return `<!doctype html>${document.documentElement.outerHTML}`;
};
