# eleventy-plugin-external-links

[![NPM version](https://img.shields.io/npm/v/@aloskutov/eleventy-plugin-external-links.svg?style=flat)](https://www.npmjs.com/package/@aloskutov/eleventy-plugin-external-links)
![npms.io (quality)](https://img.shields.io/npms-io/maintenance-score/@aloskutov/eleventy-plugin-external-links)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@aloskutov/eleventy-plugin-external-links)
[![codecov](https://codecov.io/gh/aloskutov/eleventy-plugin-external-links/branch/main/graph/badge.svg?token=TVZ408V72G)](https://codecov.io/gh/aloskutov/eleventy-plugin-external-links)
![GitHub](https://img.shields.io/github/license/aloskutov/eleventy-plugin-external-links)
[![DeepScan grade](https://deepscan.io/api/teams/16410/projects/19674/branches/514387/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16410&pid=19674&bid=514387)

[![DeepSource](https://deepsource.io/gh/aloskutov/eleventy-plugin-external-links.svg/?label=active+issues&show_trend=true&token=9-CKuKOMvMKrFroeDQ7YK2el)](https://deepsource.io/gh/aloskutov/eleventy-plugin-external-links/?ref=repository-badge)
[![DeepSource](https://deepsource.io/gh/aloskutov/eleventy-plugin-external-links.svg/?label=resolved+issues&show_trend=true&token=9-CKuKOMvMKrFroeDQ7YK2el)](https://deepsource.io/gh/aloskutov/eleventy-plugin-external-links/?ref=repository-badge)

Transform external links from `<a href='http://external-link'>` to `<a href='http://external-link'  rel='noreferrer nofollow noopener external' target='_blank'>`.

## Usage

### Install via npm

```shell
npm install @aloskutov/eleventy-plugin-external-links
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
| doctype | string | '<!doctype html>' | Doctype value |
| addDoctype | boolean | true | Add doctype to result or not |
| ext | array | ['.html'] | Extensions |
| excludedDomains | array|string | [] | For cross-linked domains and subdomains |

### Default options

```javascript
{
    url: '',
    selector: 'a',
    rel: ['noreferrer', 'nofollow', 'noopener', 'external'],
    target: '_blank',
    overwrite: true,
    excludedProtocols: [],
    doctype: '<!doctype html>',
    addDoctype: true,
}
```

## Notes

The site address can be specified without a protocol, only the fully qualified domain name. For example, `www.example.com` or `https://www.example.com` or `//www.example.com`

Addresses with protocols other than `http`, `https`, `ftp` and `ftps` are excluded from processing and remain unchanged.

**Doesn't support IDN (Internationalized Domain Names)!**

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
* `https://www.example.com:443/some-link`
* `http://www.example.com/some-link`
* `http://www.example.com:8080/some-link`
* `ftp://www.example.com/some-link`
* `//www.example.com/some-link`
* `www.example.com/some-link`
* `www.example.com`

External links

* `http://www.google.com`
* `http://www.google.com:80`
* `https://www.google.com`
* `https://www.google.com:443`
* `ftp://www.google.com`
* `protocol://www.google.com`
* `//www.google.com`
* `www.google.com`

The following links are not processed

* `mailto:some@address.com`
* `tel:1234567890`
* `file:/some/file`
* `javascript:alert(0)`
* `telnet://192.0.2.16:80/`
* `urn:oid:1.2.840.113549.1.1.1`
* `sip:911@pbx.mycompany.com`
* `news:comp.infosystems.www.servers.unix`

## TODO

* [x] add `excludedDomains`. _List of addresses that will be excluded from processing. These links will not be considered external and will remain unchanged._
* [x] add `addDoctype`. _Optional doctype_ `<!doctype html>`
* [x] add `doctype`. _Doctype string. Default:_ `<!doctype html>`
* [x] add `ext`. _List of processed files, not only `.html` files. Default:_ `.html`
