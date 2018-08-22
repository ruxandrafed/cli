# @colophon/cli [![version][npm-version]][npm-url] [![License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Downloads][npm-downloads]][npm-url]

> Discover and parse [Colophon][project] files in your GitHub repositories

## Install

```bash
npm install --production --save cli
```

###### Linux Setup

This library uses `libsecret` for storing tokens in your keychain, you may need to install it before running `npm install`.

Depending on your distribution, you will need to run the following command:

```bash
# Debian/Ubuntu:
sudo apt install libsecret-1-dev

# Red Hat-based:
sudo yum install libsecret-devel

# Arch Linux:
sudo pacman -S libsecret
```


## Usage

```
colophon <command>

Commands:
  index.js org <name>  process org repos
  index.js user        process user repos

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

---
> License: [ISC][license-url] &bull; 
> Copyright: [Colophon Project][project]

[license-url]: http://choosealicense.com/licenses/isc/
[license-image]: https://img.shields.io/github/license/project-colophon/cli.svg?style=flat-square

[travis-url]: https://travis-ci.org/project-colophon/cli
[travis-image]: https://img.shields.io/travis/project-colophon/cli.svg?style=flat-square

[npm-url]: https://www.npmjs.com/package/@colophon/cli
[npm-version]: https://img.shields.io/npm/v/@colophon/cli.svg?style=flat-square
[npm-downloads]: https://img.shields.io/npm/dm/@colophon/cli.svg?style=flat-square

[project]: https://github.com/project-colophon/schema
