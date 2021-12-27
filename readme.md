# eleventy-plugin-external-links

![example workflow](https://github.com/aloskutov/eleventy-plugin-external-links/actions/workflows/node.js.yml/badge.svg?test)
[![codecov](https://codecov.io/gh/aloskutov/eleventy-plugin-external-links/branch/main/graph/badge.svg?token=TVZ408V72G)](https://codecov.io/gh/aloskutov/eleventy-plugin-external-links)

Transform external links from `<a href='http://external-link'>` to `<a href='http://external-link'  rel='noreferrer nofollow noopener external' target='_blank'>`.

## Usage

### Install via npm

```shell
npm install --save-dev @aloskutov/eleventy-plugin-external-links
```

### Load plugin in `.eleventy.js`

```javascript
const externalLinks = require("@aloskutov/eleventy-plugin-external-links");

module.exports = (eleventyConfig) => {
    eleventyConfig.addPlugin(externalLinks, {'url': 'https://your-domain'});
};
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| url | string | null |If not set, all non-relative links are considered external.|
| rel | array or string | ['noreferrer', 'nofollow', 'noopener', 'external'] | link rel attribute |
| target | string | _blank | link target attribute |
| overwrite | boolean | true | Overwrite attribute values or not |

## Notes

The address must be specified with the protocol, and without the slash at the end of the domain name.
