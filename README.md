# Webpack 5 Boilerplate


## Requirements

* `node` : `^10 || ^12 || >=14`
* `npm`

# Setup

## Installation

1. Choose and download the latest template release from [List of Releases](https://github.com/WeAreAthlon/frontend-webpack-boilerplate/releases).
2. Extract the release archive to a new directory, rename it to your project name and browse the directory.
3. Install all dependencies using `npm` *clean install* command. 

```sh 
$ npm ci
```

> More on the clean install npm command can be read here [`npm ci`](https://docs.npmjs.com/cli/ci.html)

> You can still use `npm install` in cases the `npm ci` raises system error due to specific platform incompatibilities.

## Define Package Metadata

* Amend `package.json` file and optionally specify:
  * `name` - Name of your project. A name can be optionally prefixed by a scope, e.g. `@myorg/mypackage`.
  * `version` - Specify and maintain a version number indicator for your project code.
  * `author` - Your organisation or just yourself. You can also specify [`contributors`](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).
  * `description` - Short description of your project.
  * `keywords` - Put keywords in it. It’s an array of strings.
  * `repository` - Specify the place where your code lives.
  * `license` - Announce your code license, figure out the license from [Choose an Open Source License](https://choosealicense.com) .
  * `browserslist` - Specify the supported browsers versions - you can refer to [full list](https://github.com/browserslist/browserslist#full-list) of availalbe options.

## Configuration

### Environment Configuration

* Edit the [`environment.config.js`](environment.config.js) if you want to specify:
  * **`server`**: configure development server, specify `host`, `port`. Refer to the full development server configuration options for [`webpack-dev-server`](https://webpack.js.org/configuration/dev-server/).
  * **`limits`**: configure file size thresholds for assets optimizations.
    * Image/Font files size in bytes. Below this value the image file will be served as Data URL (_inline base64_).
  * **`paths`**: `src` or `dist` directories names and file system location.

### Additional `webpack` configuration

You can additionally configure `webpack` for specific environment:
* `development` - [`webpack.dev.config.js`](webpack.dev.config.js)
* `production` - [`webpack.prod.config.js`](webpack.prod.config.js)
  * Note that if you prefer to build and deploy [`sourcemap`](https://webpack.js.org/configuration/devtool/#production) files:
> You should configure your server to disallow access to the Source Map file for normal users!

## Development

### Assets Source

* **SASS/PostCSS** files are located under `src/scss/`
* **JavaScript** files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `src/js/`
* **Image** files are located under `src/images/`
* **Font** files are located under `src/fonts/`
* **HTML** files are located under `src/templates/`
  * It will **automatically** build **all HTML files** placed under `src/templates/` directory, no need to manually configure each template anymore!

## Build Assets

### One time build assets for development

```sh
$ npm run build
```

### Build assets and enable source files watcher

```sh
$ npm run watch
```

This command is suitable if you develop with external web server.

**Note:** File watching does not work with *NFS* (*Windows*) and machines in *VirtualBox*. 
Extend the configuration in such cases by:

```js
module.exports = {
  //...
  watchOptions: {
    poll: 1000 // Check for changes every second
  }
};
```

### Start a development server - reloading automatically after each file change.

```sh
$ npm run serve
```

## Production / Build Assets

* Optimize assets for production by:

```sh
$ npm run production
```

## Processed Built Assets

* _CSS_ files are located under `/dist/css/`
* _JavaScript_ files with support of _ES6 / ECMAScript 2016(ES7)_ files are located under `/dist/js/`
* _Images_ are located under `/dist/images/`
  * Images part of the _design_ (_usually referenced in the CSS_) are located under `/dist/images/design/`
  * Images part of the _content_ (_usually referenced via `<img>` tags_) are located under `/dist/images/content/`
* _Fonts_ are located under `/dist/fonts/`
* _HTML_ files are located under `/dist/`

## Run Code Style Linters

* **JS and SASS**

```sh
$ npm run lint
```
* **Fix JS and SASS**

```sh
$ npm run lint:fix
```
