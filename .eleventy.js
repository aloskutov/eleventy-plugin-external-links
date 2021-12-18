const { JSDOM } = require('jsdom');

module.exports = (elConfig, options = {}) => {
  options = Object.assign(
    {
      url: null,
      selector: 'a',
      rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
      target: '_blank',
      overwrite: true,
    },
    options
  );

  elConfig.addTransform('externalLinks', (content, outputPath) => {
    if (outputPath && !outputPath.endsWith(".html")) {
      return content;
    }

    if (options.url === '') {
      options.url = null;
    }

    const dom = new JSDOM(content);
    const document = dom.window.document;
    const [...links] = document.querySelectorAll(options.selector);

    links.forEach((link) => {
      const href = link.getAttribute('href');
      const linkRel = link.getAttribute('rel');
      const linkTarget = link.getAttribute('target');
      let rel = '';

      if (typeof options.rel === 'array' ) {
        rel = options.rel.join(" ");
      } else {
        rel = options.rel;
      }

      if (
        !href.startsWith(options.url) &&
        (href.startsWith("//") ||
          href.startsWith('https://') ||
          href.startsWith('http://'))
      ) {
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
  });
};
