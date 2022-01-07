const externalLinks = require('./src/externalLinks');

module.exports = (eleventyConfig, options = {}) => {

  eleventyConfig.addTransform('externalLinks', (content, outputPath) => {
    return externalLinks(content, outputPath, options);
  });
};
