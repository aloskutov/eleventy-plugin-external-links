const {JSDOM} = require('jsdom');

/**
 * Extract hostname from url/link
 * @param {string} url link or url string
 * @return {string|boolean} hostname or false
 */
function extractHostname(url) {
  const regex = new RegExp('^(?:\\w*.?\\/\\/)?([^\\/]*)\\/?', 'g');
  try {
    return regex.exec(url)[1].toLowerCase();
  } catch (e) {
    console.error('External-Links: Hostname not found');
    return false;
  }
}

module.exports = function(content, outputPath, globalOptions = {}) {
  try {
    if (!outputPath.endsWith('.html')) {
      return content;
    }
  } catch (e) {
    if (e instanceof TypeError) {
      console.error('External-Links: Undefined outputPath');
      return content;
    }
  }

  const options = Object.assign(
      {
        url: null,
        selector: 'a',
        rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
        target: '_blank',
        overwrite: true,
      },
      globalOptions,
  );

  if (options.url === '') {
    options.url = null;
  }

  const urlHostname = options.url ? extractHostname(options.url) : false;

  const dom = new JSDOM(content);
  const document = dom.window.document;
  const [...links] = document.querySelectorAll(options.selector);

  links.forEach((link) => {
    const href = link.getAttribute('href');
    const hrefHostname = extractHostname(href);
    const linkRel = link.getAttribute('rel');
    const linkTarget = link.getAttribute('target');
    let rel = '';

    if (Array.isArray(options.rel)) {
      rel = options.rel.join(' ');
    } else {
      rel = options.rel;
    }

    if (hrefHostname &&
        hrefHostname !== urlHostname) {
      if (options.overwrite) {
        link.setAttribute('rel', rel);
        link.setAttribute('target', options.target);
      } else {
        link.setAttribute('rel', linkRel || rel);
        link.setAttribute('target', linkTarget || options.target);
      }
    }
  });
  return '<!doctype html>' + document.documentElement.outerHTML;
};
