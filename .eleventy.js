import externalLinks from './src/externalLinks.js';

export default (eleventyConfig, options = {}) => {

  eleventyConfig.addTransform('externalLinks', (content, outputPath) => {
    return externalLinks(content, outputPath, options);
  });
};
