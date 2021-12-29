# eleventy-plugin-external-links

[![NPM version](https://img.shields.io/npm/v/@aloskutov/eleventy-plugin-external-links.svg?style=flat)](https://www.npmjs.com/package/@aloskutov/eleventy-plugin-external-links)

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
| url | string | `` | If not set, all non-relative links are considered external.|
| rel | array or string | ['noreferrer', 'nofollow', 'noopener', 'external'] | link rel attribute |
| target | string | _blank | link target attribute |
| overwrite | boolean | true | Overwrite attribute values or not. If the value is false, then the existing attribute is not overwritten. |
| excludedProtocols | array | [] | Exclude links with matching protocols from processing. The protocol must be specified without a colon. Ex. `['ftp']`|

### Default options

```javascript
{
    url: '',
    selector: 'a',
    rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
    target: '_blank',
    overwrite: true,
    excludedProtocols: []
}
```

## Notes

The site address can be specified without a protocol, only the fully qualified domain name. For example, `www.example.com` or `https://www.example.com` or `//www.example.com`

Addresses with `mailto:` and `tel:` protocols are excluded from processing, and remain unchanged.

## Examples

### With default values, except url

```javascript
const externalLinks = require('@aloskutov/eleventy-plugin-external-links');

module.exports = (eleventyConfig, options = {}) => {
// some code

    eleventyConfig.addPlugin(externalLinks, {url: "www.example.com"});

//some code
};
```

Local links:

* `/some-link`
* `/?link-with-query-string`
* `#link-with-id`
* `https://www.example.com/some-link`
* `http://www.example.com/some-link`
* `ftp://www.example.com/some-link`
* `//www.example.com/some-link`
* `www.example.com/some-link`
* `www.example.com`

External links

* `http://www.google.com`
* `https://www.google.com`
* `ftp://www.google.com`
* `protocol://www.google.com`
* `//www.google.com`
* `www.google.com`

The following links are not processed

* `mailto:some@address.com`
* `tel:1234567890`

## TODO

* [ ] add `excludedUrls`. _List of addresses that will be excluded from processing. These links will not be considered external and will remain unchanged._
* [ ] add `addDoctype`. _Optional doctype_ `<!doctype html>`
* [ ] add `doctype`. _Doctype string. Default:_ `<!doctype html>`
* [ ] add `ext`. _List of processed files, not only `.html` files. Default:_ `.html`
