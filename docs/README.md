# Documentation

## Table of contents

- [Documentation](#documentation)

  - [Table of contents](#table-of-contents)
  - [Quickstart](#quickstart)
  - [Development](#development)
  - [Building](#building)
  - [Deploying to GitHub Pages](#deploying-to-github-pages)
  - [Structure](#structure)
  - <details>
      <summary><b>Common</b></summary>

    - [CSS](#css)
    - [HTML](#html)
      - [Pages](#pages)
    - [JavaScript](#javascript)
    - [Local fonts](#fonts)
    - [SVG Sprites](#svg-sprites)
    - [Data](#data)
    - [Libraries](#libraries)
    </details>

  - <details>
      <summary><b>Recommendations for use</b></summary>

    - [Text data storage](#text-data-storage-improvised-database)
    - [Component approach](#component-approach)
      - [Components structure](#components-structure)
    - [Active class for link to current page](#active-class-for-link-to-current-page)

    </details>

  - [CLI](#cli)
  - [Code linting](#code-linting)
    - [Lint](#lint)
    - [Automatic fix](#automatic-fix)
  - [Component generator](#component-generator)
  - [License](#license)

## Quickstart

Make sure you have [Node.js](https://nodejs.org/en/) installed.

Install the [Yarn](https://yarnpkg.com/) globally:

```console
$ npm i -g yarn
```

Install the [Gulp](https://gulpjs.com/) and [bem-tools](https://en.bem.info/) globally:

```console
$ yarn add --global gulp bem-tools-core bem-tools-create
```

Clone the project:

```console
$ git clone https://github.com/joseffie/gulp-joseffie-settings.git my-project
```

Go to the project and install needed dependencies:

```console
$ yarn
```

After installing the dependencies, you may start the dev server:

```console
$ yarn run dev
```

## Development

1. Run `yarn run dev` to see your app at `http://localhost:9050/`.

> **TIP:** In order to provide a quick development start, local fonts and SVG sprites <ins>are not</ins> automatically compiled. If your project has them, you must compile the fonts and SVG icons yourself before starting development:

```
$ yarn run build:fonts     # converts a local fonts to woff/woff2 format
$ yarn run build:sprites   # converts a SVG icons into SVG sprite
```

> You don't have to do this when you run `yarn run build` and `yarn run deploy`.

## Building

1. Run `yarn run build` to build your project in production mode. This mode will automatically compile SVG sprites, local fonts, create a SCSS file with `@font-face` declarations, optimize images, minify files.

## Deploying to Github Pages

1. Run `git init` to init Git.
2. Push your project to repository.
3. Run `yarn run deploy`. This command will build your project in production mode and push the contents of the `dist` folder to the `gh-pages` branch of your GitHub repository.
4. You can now navigate to your GitHub Page at `username.github.io/repository-name`

## Structure

```
gulp-joseffie-settings/              # Project root
├── dist                             # Compiled files
├── docs                             # Documentation
├── gulp                             # Gulp tasks and config
├── src
|   ├── base
|   |   ├── data                     # Folder with data.json
|   |   ├── scripts
|   |   |   ├── helpers              # JS various helpers
|   |   |   ├── index.js             # JS main file
|   |   ├── pug                      # Pug layouts
|   |   ├── styles
|   |   |   ├── core
|   |   |   |   ├── mixins           # System level mixins
|   |   |   |   ├── typography       # Typography styles
|   |   |   |   ├── variables        # System level variables
|   |   |   ├── _common.scss         # Common styles
|   |   |   ├── _variables.scss      # Project variables
|   |   |   ├── main.scss            # Main styles
|   |   |   ├── reset.scss           # Styles reset
|   ├── components                   # Components folder
|   ├── fonts                        # Local fonts
|   ├── img
|   ├── views                        # Pug pages
|   ├── svgico
|   |   ├── mono                     # Single-color SVG icons
|   |   ├── multi                    # Multi-color SVG icons
|   ├── vendor                       # Files of libraries
└── templates                        # bem-create templates
└── .archive                         # Folder with ZIP archive
```

## Common

### CSS

- [Sass (SCSS syntax)](https://sass-lang.com/) – popular, feature CSS-preprocessor. Possible to use both syntaxes (Sass and SCSS) in a project at the same time.
- [PostCSS](https://postcss.org/)
  - [Autoprefixer](https://github.com/postcss/autoprefixer) - parses CSS and add vendor prefixes to rules by [Can I Use](https://caniuse.com/).
  - [CSSNANO](https://cssnano.co/) - a pack of PostCSS plugins that optimize your CSS code.
  - [postcss-preset-env](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) - plugin that converts modern CSS code into code that browsers understand.
  - [css-mqpacker](https://github.com/hail2u/node-css-mqpacker) - plugin that combines same media queries into one.
  - [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) - plugin that fixes bugs in Flex layout.
- [Stylelint.](https://stylelint.io/)
  - [Stylelint-order](https://github.com/hudochenkov/stylelint-order) – helps to keep rules and properties in a certain order.

### HTML

- [Pug (aka Jade)](https://pugjs.org/api/getting-started.html) – convenient, functional template engine.
- [PostHTML](https://github.com/posthtml/posthtml) – tool to transform HTML/XML with JS plugins.

#### Pages

The `src/views` folder contains the page files. Each of the pages must extend the template `src/base/pug/default.pug`.

The variables of `pageConfig` block can be used to manipulate the contents of pages. Syntax:

```pug
//- It is preferable to declare at the beginning of the page file
block pageConfig
  -
    title = '<title-name>'
    pageUrl = '<url>'
    bodyClass = ['<body-class-1>', '<body-class-2>', 'body-class-...']
```

- The `title` variable defines the title of the page.
- Using the `pageUrl` variable, you can give the main navigation link to the current page an active class ([more about it](#active-class-for-link-to-current-page)).
- With the `bodyClass` array, you can assign any classes to the `body` tag.

### JavaScript

- Tools:
  - [Node.js](https://nodejs.org/en/) - JavaScript runtime.
  - [Webpack 5](https://webpack.js.org/) – module bundler.
  - [Babel](https://babeljs.io/) - JavaScript transpiler.
  - [Yarn](https://yarnpkg.com/) - package manager.

### Fonts

Place local fonts in `src/fonts` folder. You can use `otf`, `ttf`, `woff` and `woff2` formats.

> It is important that the name of the font file is in the format "Font Name - Font Shape", such as "Roboto-Regular" or "IbarraRealNova-Mediumitalic". Otherwise, the `fonts` Gulp task will not be able to determine the font weight and font style, and an incorrect `@font-face` will end up in the `_fonts.scss` file.

To compile the local fonts and create font stylesheet file, run `yarn run build:fonts`. After using the command, in the `src/base/styles` folder will appear the `_fonts.scss` file that contains `@font-face` declarations for fonts.

To use local fonts in styles, don't forget to uncomment this line in the `src/base/styles/reset.scss` file:

```scss
// @import '_fonts';
```

### SVG Sprites

To convert SVG icons to SVG sprite, you need to follow a few simple steps.

1. Depending on the number of colors in your SVG, put the icons in the appropriate folders: if the icon has only one color, put it in `src/svgico/mono`, otherwise in `src/svgico/multi`. This division into colors is done so that each of the types of icons (single-color/multi-color) is optimized as it is necessary for the current type. For example, fill is removed from single-color icons so that it can be easily changed, otherwise `Shadow DOM` prevents this.
2. Run `yarn run build:sprites`.
3. In any Pug component, import icon mixin: `include ../icon/icon.pug`.
4. Use `+icon(name='icon-name', type='icon-type')`. A couple of examples:

```pug
+icon(name='logo', type='multi')
+icon(name='apple', type='mono')
```

### Data

All data in modules stores in `src/base/data/data.json`.

### Libraries

Put the library files in the `src/vendor` folder.

SCSS library files import into `src/vendor/_vendor.scss`.

The JS library files import into `src/vendor/vendor.js`. If you include anything in this file, don't forget to do the following for everything to apply:

1. In `webpack.config.babel.js` uncomment the line containing the `vendor` property in the `entry` object:

```js
const webpackConfig = {
  entry: {
    index: './index.js',
    // vendor: '../../vendor/vendor.js', # uncomment this line
  },
};
```

2. In the page file, for example `index.pug`, where you want to add the library script, paste:

```pug
block append scripts
  script(src='scripts/vendor.js')
```

If you want this script to be included in all pages of your project, you can add it directly to the `src/base/pug/default.pug` template, in the `scripts` block:

```pug
block scripts
  script(src='scripts/index.js')
  script(src='scripts/vendor.js') //- add this to the block
```

## Recommendations for use

### Text data storage (improvised database)

In order not to litter the code of Pug files with text data, it is worth moving all the texts into a separate file. Texts mean, for example, the text of an article or any lists, or the same menu items in the header, in the footer, in the sidebar, etc. All this leads to readability of the code, and it will be easier to fix errors when everything is in one place.

You can store all texts in the `data.json` file (`src/base/data/data.json`). HTML markup is valid, but Pug must use output interpolation `!=` to output it. For example, `p!= variable`. The `data.json` file is already included in all Pug files by default and is parsed by the Pug task, so there is no need to make additional connections.

If you need to use this feature, you must create an array of objects and fill it with all the text information. Let's look at an example of using `data.json` to create a simple list.

First, we enter the text of the list items in `data.json`:

```json
{
  "paradigms": [
    { "title": "Abstraction" },
    { "title": "Encapsulation" },
    { "title": "Polymorphism" }
  ]
}
```

Then we can iterate over this array in Pug with its built-in `each in` loop:

```pug
h3.list-label Paradigms of OOP:
ul.list
  each item in paradigms
    li.list-item!= item.title
```

The end result of this code will be this HTML markup:

```html
<h3 class="list-label">Paradigms of OOP:</h3>
<ul class="list">
  <li class="list-item">Abstraction</li>
  <li class="list-item">Encapsulation</li>
  <li class="list-item">Polymorphism</li>
</ul>
```

### Component approach

For reuse and easy layout extensibility, you should distribute the code into components. All components located in `src/components` folder. Component Pug files should be formatted as mixins, this makes it easier to change the contents of a component if you use it in multiple places without creating a similar component or changing the current one.

You can include Pug component files in page files or other components. Import the component SCSS files into `src/components/components.scss`. JS files of components import `src/components/components.js`.

To learn how to create components easier, see [Component generator.](#component-generator-using-bem-toolshttpsgithubcombem-toolsbem-tools-create)

#### Components structure

```
src
├── components                    # All components folder
|   ├── component-name            # Component folder
|   |   ├── component-name.pug    # Component Pug file
|   |   ├── component-name.scss   # Component SCSS file
|   |   ├── component-name.js     # Component JS file
|   ├── components.scss           # Component SCSS files imports
|   ├── components.js             # Component JS files imports
```

### Active class for link to current page

If you need to highlight the link to active page on the site, then in corresponding page file you must define `block pageConfig` and in the `pageUrl` variable specify the `url` of the link you need, declared in `src/base/data/data.json` in `mainNavData`.

```pug
block pageConfig
  - pageUrl = 'index.html'; //- same values
```

```jsonc
{
  "mainNavData": [
    {
      "title": "Home",
      "url": "index.html" // same values
    },
    {
      "title": "About us",
      "url": "about.html"
    }
  ]
}
```

In the `main-nav.pug` mixin, when iterating over the `mainNavData` array, some conditions are used that return certain classes of the current link, among them a condition that, if `pageUrl` and `url` of the current link are equal, returns the active (`main-nav__item_active`) class.

```pug
each item in mainNavData
  - var itemClasses = ['main-nav__item'];

  if (item.url === pageUrl)
    - itemClasses.push('main-nav__item_active');

  li(class=itemClasses)
```

So the result would be this HTML markup:

```html
<nav class="main-nav">
  <ul class="main-nav__list">
    <li class="main-nav__item main-nav__item_active"><a href="index.html">Home</a></li>
    <li class="main-nav__item"><a href="about.html">About us</a></li>
  </ul>
</nav>
```

## CLI

|    Command    |                                                       Description                                                       |
| :-----------: | :---------------------------------------------------------------------------------------------------------------------: |
|      dev      |                                           runs the build in development mode                                            |
|     build     |    optimizes source files, converts preprocessor files into browser-understandable files, and sends to `dist` folder    |
|      zip      |                                          runs `build` and archives the project                                          |
|   build:pug   |                                        optimizes page files and pushs to `dist`                                         |
| build:styles  |                                        optimizes style files and pushs to `dist`                                        |
| build:scripts |                                         optimizes JS files and pushs to `dist`                                          |
| build:images  |                                          optimizes images and pushs to `dist`                                           |
|  build:fonts  |       converts local fonts to woff/woff2 formats, automatically generate SCSS file with `@font-face` declarations       |
| build:sprites |                                            converts SVG icons to SVG sprite                                             |
|    deploy     |                         runs `build`, then pushs the build to GitHub Pages (`gh-pages` branch)                          |
|    publish    |                                   pushs the build to GitHub pages without run `build`                                   |
|   lint:pug    |                                               checks Pug code for errors                                                |
|  lint:styles  | checks SCSS code for errors. If you specify the `--fix` flag, then the errors will be automatically fixed by the linter |
| lint:scripts  |  checks JS code for errors. If you specify the `--fix` flag, then the errors will be automatically fixed by the linter  |

### Code linting

_Force you to follow a rigid code guide, which leads to good readability of your code, and automatically check your code for errors._

For more convenient work with linters, I advise you to install the `Stylelint`, `ESLint`, `puglint` extensions in your IDEs. To make sure your code is automatically formatted on save, I also recommend installing the `Prettier` extension.

#### Lint

```
$ yarn run lint:pug          # check for errors in Pug code
$ yarn run lint:styles       # check for errors in SCSS code
$ yarn run lint:scripts      # check for errors in JS code
```

#### Automatic Fix

```
$ yarn run lint:styles --fix      # fix all errors in SCSS code
$ yarn run lint:scripts --fix     # fix all errors in JS code
```

Unfortunately, automatic fix of Pug code is not available because the [Pug-linter](https://github.com/pugjs/pug-lint) developer did not implement the `--fix` flag. So in the case of Pug, you will have to use `yarn run lint:pug` and fix errors manually with it. At least for now.

## Component generator

_Create empty component by name in `src/components` folder._

By default generates only `*.pug`, `*.scss` and `*.js` files.

Syntax:

```console
$ bem create <component-name> <args>
```

If you need to create only one file type, use the `-T` flag:

```console
$ bem create header -T pug
```

If you need to remove one or more default file types, use the `-n` flag:

```console
$ bem create header -n js
```

If you need to add another file type to your component folder, use the `-t` flag:

```console
$ bem create header -t md
```

You can also combine flags:

```console
$ bem create menu -n js -t yml
```

## License

[The GPL3.0 License (GPL3.0 only)](../LICENSE)
