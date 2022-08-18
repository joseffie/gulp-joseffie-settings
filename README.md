# gulp-joseffie-settings

_Gulp-based starter template for better front-end coding with [Pug](https://pugjs.org/) and [SCSS](https://sass-lang.com/guide) preprocessors_

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

1. Install the [Node.js](https://nodejs.org/en/)
2. Install the [Gulp](https://gulpjs.com/) and [Bem](https://en.bem.info/) globally:

```
$ npm install -g gulp bem-tools-core bem-tools-create
```

3. Clone the project:

```
$ git clone https://github.com/joseffie/gulp-joseffie-settings.git --depth 1 my-project
```

4. Go to the project and run:

```
$ npm install
```

5. After installing the dependencies, start the dev server:

```
$ npm run dev
```

## Main tasks

- `npm run dev` – launches watcher and server.
- `npm run build` – compiles a project without compiling sprites and fonts.
- `npm run zip` – compiles and archives a project.
- `npm run deploy` – compiles project and pushes in `gh-pages` branch in Git repo.
- `npm run build:fonts` – compiles an existing fonts located in `src/fonts`.
- `npm run build:sprites` – compiles an existing SVG icons located in `src/svgico/**` into SVG sprites.

## Component generator

Create empty component by name in `src/components` folder.

By default generates only `*.pug`, `*.scss` and `*.js` files.

```
$ bem create component-name
```

If you only need to create one file type, use the `-T` flag:

```
$ bem create component-name -T pug
```

If you need to remove one or more default file types, use the `-n` flag:

```
$ bem create component-name -n js
```

If you need to add another file type to your component folder, use the `-t` flag:

```
$ bem create component-name -t md
```

You can also combine flags:

```
$ bem create component-name -n js -t yml
```

## License

[The GPL3.0 License (GPL3.0 only)](./LICENSE)
