const externalLinks = require('./src/externalLinks');

module.exports = (eleventyConfig, options = {}) => {
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

  eleventyConfig.addTransform('externalLinks', (content, outputPath) => {
    return externalLinks(content, outputPath, options);
  });
};
