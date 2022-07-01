# Gulp-Settings: Gulp + Webpack build for Web Development

## Capabilities

- Component approach to work: the structure of component files is implemented according to BEM.
- [BEM](https://en.bem.info/) class naming.
- Automatic creation of component directories with files using the [bem-tools-create](https://github.com/bem-tools/bem-tools-create) tool.
- Using the [Pug](https://pugjs.org/) and [SCSS](https://sass-lang.com/guide) preprocessors.
- Using a hard code guide.
- Using Webpack to build JavaScript modules.
- Checking for errors on commit.
- Starter template for a quick start of layout.

## Instalation

- Install [NodeJS](https://nodejs.org/en/).
- Install globally:
  - [Gulp](https://gulpjs.com/): `npm i -g gulp`
  - [Bem-tools](https://www.npmjs.com/package/bem-tools-core): `npm i -g bem-tools-core`
- Download the build with [Git](https://git-scm.com/downloads): `git clone https://github.com/joseffie/Gulp-Settings.git`
- Follow to the downloaded build folder: `cd Gulp-Settings`
- Instal dependencies: `npm i`

To start working on a project, type `npm run dev`. If there are no errors, then by default the http://localhost:3000 domain will launch with the start layout template.

To build the project, type `npm run build`. The build mode involves project optimization: image compression, minification of CSS and JS files, automatic addition of vendor prefixes for browser support.

## Commands

- Main:
  - `npm run dev` — starts the project in development mode.
  - `npm run build` — runs the project in production mode, copying files to the `dist` folder.
  - `npm run gh-pages` — automatically creates the GitHub Pages repository without build the project.
  - `npm run build:gh-pages` — builds the project and automatically creates the GitHub Pages repository.
- Linters:
  - `npm run lint-pug` — starts checking for errors in Pug code.
  - `npm run lint-scss` — starts checking for errors in SCSS code.
  - `npm run lint-js` — starts checking for errors in JS code.
  - `npm run lint-all` — starts checking for errors in Pug, SCSS, JS code.
  - `npm run fix-scss` — fixes all errors in SCSS code.
  - `npm run fix-js` — fixes all errors in JS code.
  - `npm run fix-all` — fixes all errors in SCSS, JS code.
- Other:
  - `npm run clean` — removes the "dist" folder if it exists.
  - `npm run fonts` — converts the fonts placed in the `fonts` folder into several browser-friendly formats and creates a file with font-face included.
  - `npm run sprite` — converts SVG icons placed in the `svgico` folder to SVG sprite
  - `npm run zip` — archives the project in production mode.

## Project file structure

```
Gulp-Settings
|— dist/
|— gulp/
|    |— config/
|    |— tasks/
|    |— version.json
|— src
|    |— base
|    |    |— data
|    |    |    |— data.json
|    |    |— js
|    |    |    |— index.js
|    |    |— pug
|    |    |    |— base.pug
|    |    |    |— head.pug
|    |    |— scss
|    |    |    |— _fonts.scss
|    |    |    |— _variables.scss
|    |    |    |— main.scss
|    |    |    |— print.scss
|    |— components
|    |    |— ***
|    |    |— components.scss
|    |    |— components.mjs
|    |— fonts/
|    |— img/
|    |— mixins
|    |    |— pug/
|    |    |— scss/
|    |    |— mixins.pug
|    |    |— mixins.scss
|    |— pages/
|    |— svgico/
|    |— vendor/
|    index.pug
| .bemrc.js
| .editorconfig
| .prettierignore
| .prettierrc.json
| .eslintignore
| .eslintrc.json
| .gitignore
| .pug-lintrc.json
| .stylelintignore
| .stylelintrc.json
| gulpfile.js
| package-lock.json
| package.json
| webpack.config.js
```

- Root:
  - `.bemrc.js` — BEM settings.
  - `.editorconfig` — configuration file of the project.
  - `.prettierignore` — exclusion list for Prettier.
  - `.prettierrc.json` — Prettier settings.
  - `.eslintignore` — exclusion list for ESlint.
  - `.eslintrc.json` — ESlint settings.
  - `.gitignore` — exclusion list for Git.
  - `.pug-lintrc.json` - Pug-linter settings.
  - `.stylelintignore` — exclusion list for Stylelint.
  - `.stylelintrc.json` — Stylelint settings.
  - `gulpfile.js` — settings for Gulp.
  - `package.json` — a list of dependencies.
  - `webpack.config.js` — settings for Webpack.
- The `src` folder is used to develop and store source files:
  - `src/base` — folder that stores the base Pug layout, core SCSS, JS, and data.json files.
  - `src/components` — folder that stores BEM components.
  - `src/fonts` — folder that stores fonts.
  - `src/img` — folder that stores images.
  - `src/mixins` — folder that stores Pug and SCSS mixins.
  - `src/pages` — folder that stores non-index pages.
  - `src/svgico` — folder that stores SVG images that are compiled into a sprite.
  - `src/vendor` — folder that stores library style files.
  - `index.pug` — main Pug file.
- The `dist` folder contains the final build files.
- The `gulp` folder contains Gulp tasks.

## Recommendations for use

### Text data storage (improvised database)

In order not to litter the code of Pug files with text data, it is worth moving all the texts into a separate file. Texts mean, for example, the text of an article or any lists, or the same menu items in the header, in the footer, in the sidebar, etc. All this leads to readability of the code, and it will be easier to fix errors when everything is in one place.

You can store all texts in the `data.json` file (`src/base/data/data.json`). HTML markup is valid, but Pug must use output interpolation `!=` to output it. For example, `p!= variable`. The data.json file is already included in all Pug files by default and is parsed by the Pug task, so there is no need to make additional connections.

If you need to use this feature, you must create an array of objects and fill it with all the text information. Let's look at an example of using data.json to create a simple list.

First, we enter the text of the list items in data.json:

```
{
  "someList": [
    { "text": "Some interesting text" },
    { "text": "Other interesting text" },
    { "text": "Text that wants to <br> wrap to a new line" }
  ]
}
```

Then we can iterate over the given array in Pug with its built-in `each in` loop:

```
ul
  each item in someList
    li!= item.text
```

The end result of this code will be this HTML markup:

```
<ul>
  <li>Some interesting text</li>
  <li>Other interesting text</li>
  <li>
    Text that wants to <br> wrap to a new line
  </li>
</ul>
```

### Component approach

Each block that needs to be make up out is created as a component. All components are in the `src/components` directory. The component includes 3 types of files - `.pug`, `.scss`, `.mjs` (if you need to write a JS script). The name of the file names is used with the name of the component. All this is made for easy reuse. For example, components with this approach are easily copied from project to project.

Here is an example of creating a header component structure with its files.

```
|— header
|   |— header.pug
|   |— header.scss
|   |— header.mjs
| ***
| ***
```

Pug files are may be included in the file where needed. The sсss files of the components are included manually in the `components.sсss` file, which is located in the `src/components/` directory. The js files of the components are included manually in the `components.mjs` file, which is located in the `src/components/` directory.

### Automate component creation with bem-tools-create

In order not to constantly manually create component files and folders, we can speed up this process.

To create a component, you need to write a command in the console:

`bem create component-name`

In this case, "component-name" is the name of the component being created. After this command, a folder with the created component will appear in the `src/components` directory. In the default folder of the component, 3 file types with the same name are created - pug, sсss, mjs. That is, in this case, `component-name.pug`, `component-name.scss`, `component-name.js`.

If it is necessary to exclude any file, then it is necessary to add `-n extension` after the command declaration. For example:

`bem create component-name -n mjs`

After this command, a component is created with .pug and .scss files. The .mjs file will be excluded.

If you need to create only one type of file, for example, only pug, then add the `-T` flag before the file extension:

`bem create -T pug`

Detailed bem-tools-create documentation [is here](https://github.com/bem-tools/bem-tools-create)

### Project pages

- The project pages are located in the `src/pages` folder.
  - Each page (including the main one) inherits one template `src/base/pug/base.pug`.
  - Main page: `src/index.pug`.

### Fonts

- The fonts are located in the `src/fonts` folder.
  - You can use otf, ttf, woff, woff2 formats.
  - To compile the fonts, use the command `npm run fonts`.
  - After using the command, in the `src/base/scss` folder will appear the `_fonts.scss` file.
  - To use local fonts, don't forget to uncomment the 4th line in `src/base/scss/main.scss`.

### Creating SVG sprites

For better performance of the final layout, SVG icon files are best combined into sprites. This is pretty easy to do here.

First you need to move all your SVG icons inside `src/svgico` and run the `npm run sprite` script which will automatically create the sprite. The resulting sprite will be generated in the `src/img` folder.

Then in the Pug file, you can insert an icon using the `+icon('iconName', 'className')` mixin. "IconName" is the name of the SVG icon file. Optionally, you can fill in the optional "className" attribute, which can be used to set the HTML class for the icon.

You just need to set the height and width of the icon in SCSS (if you didn't specify "className", you can refer to the icon via the parent element: `.parent svg`), and now it is already displayed on the site.

### Code linting

Pug-linter, Stylelint, ESlint are integrated into the assembly. They allow you to automatically check your code for errors, and also force you to follow a rigid code guide, which leads to good readability of your code.

For more convenient work with linters, you should install the `Stylelint`, `ESLint`, `puglint` extensions in your IDEs. To make sure your code is automatically formatted on save, I also recommend installing the `Prettier` extension.

The work of linters is determined by the corresponding configs. For Pug this is `.pug-lintrc.json`, for SCSS it is `.stylelintrc.json`, for JS it is `.eslintrc.json`.

Linters automatically fix your mistakes if you commit. But you can also check or fix the code manually using commands.

```
  npm run lint-pug — starts checking for errors in Pug code.
  npm run lint-scss — starts checking for errors in SCSS code.
  npm run lint-js — starts checking for errors in JS code.
  npm run lint-all — starts checking for errors in Pug, SCSS, JS code.
```

```
  npm run fix-scss — fixes all errors in SCSS code.
  npm run fix-js — fixes all errors in JS code.
  npm run fix-all — fixes all errors in SCSS, JS code.
```

Unfortunately, automatic linting of Pug code is not available because the Pug-linter developer did not implement the `--fix` flag. So in the case of Pug, you will have to use `npm run lint-pug` and fix errors manually with it. At least for now.

### Deploy to GitHub Pages

If you need to place your project in a Git repository and use GitHub Pages to show the layout result, for example, to a customer, then my build allows you to do this.

To host your project on GitHub pages, you need to create a Git repository and add your project to it. Folders like `dist` and `node_modules` will not get into the repository thanks to `.gitignore`.

After placing the project sources, you should use the `npm run build:gh-pages` command to build the project in production mode and put the finished layout on GitHub pages. If you have already built the project using `npm run build`, you can use `npm run gh-pages`. Then in the repository settings, under "Branches", change the default branch to `gh-pages`.

You can now navigate to your GitHub page at `username.github.io/repository-name`.
