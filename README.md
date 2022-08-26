# gulp-joseffie-settings

> Gulp-based starter template for better front-end coding with [Pug](https://pugjs.org/) and [SCSS](https://sass-lang.com/guide) preprocessors

## Documentation

More information see in [docs](./docs/) folder

## Core features

- Component approach with BEM based.
- Automatic creation of component directories with files using the [bem-tools-create](https://github.com/bem-tools/bem-tools-create) tool.
- Automatic compilation of fonts to woff/woff2 and file creation with @font-face.
- Automatic icon system based on SVG Symbols.
- Checking for errors on commit.
- Using a hard code guide.

## Quickstart

Make sure you have [Node.js](https://nodejs.org/en/) installed.

1. Install the [Yarn](https://yarnpkg.com/) globally:

```console
$ npm i -g yarn
```

2. Install the [Gulp](https://gulpjs.com/) and [bem-tools](https://en.bem.info/) globally:

```console
$ yarn add --global gulp bem-tools-core bem-tools-create
```

3. Clone the project:

```console
$ git clone https://github.com/joseffie/gulp-joseffie-settings.git my-project
```

4. Go to the project and install needed dependencies:

```console
$ yarn
```

5. After installing the dependencies, you may start the dev server:

```console
$ yarn run dev
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

## Component generator

Create empty component by name in `src/components` folder.

By default generates only `*.pug`, `*.scss` and `*.js` files.

Syntax:

```console
$ bem create <component-name> <tags>
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

[The GPL3.0 License (GPL3.0 only)](./LICENSE)
