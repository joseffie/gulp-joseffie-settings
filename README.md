# Gulp-Joseffie-Settings: Gulp + Webpack build for Web Development

## Capabilities

- Component approach to work: the structure of component files is implemented according to BEM.
- [BEM](https://en.bem.info/) class naming.
- Automatic creation of component directories with files using the [bem-tools-create](https://github.com/bem-tools/bem-tools-create) tool.
- Using the [Pug](https://pugjs.org/) and [SCSS](https://sass-lang.com/guide) preprocessors.
- Using a hard code guide.
- Using the [Babel](https://babeljs.io/) transpiler to support ES6 syntax by browsers.
- Using [Webpack](https://webpack.js.org/) to build JavaScript modules.
- Checking for errors on commit.
- Starter template for a quick start of layout.

## Instalation

- Install [NodeJS](https://nodejs.org/en/).
- Install globally:
  - [Gulp](https://gulpjs.com/): `npm i -g gulp`
  - [Bem-tools](https://www.npmjs.com/package/bem-tools-core): `npm i -g bem-tools-core`
- Download the build with [Git](https://git-scm.com/downloads): `git clone https://github.com/joseffie/Gulp-Settings.git`
- Install dependencies: `npm i`

To start working on a project, type `npm run dev`. If there are no errors, then by default the http://localhost:3000 domain will launch with the start layout template.

To build the project, type `npm run build`. The build mode involves project optimization: image compression, minification of CSS and JS files, automatic addition of vendor prefixes for browser support.

## Commands

- Main
  - `npm run dev` – runs the project in development mode.
  - `npm run build` – runs the project in production mode.
  - `npm run zip` – archives the project in production mode.
  - `npm run clean` — removes the `dist` folder if it exists.
  - `npm run fonts` — converts the fonts placed in the `fonts` folder into several browser-friendly formats and creates a file with font-face included.
  - `npm run sprite` — converts SVG icons placed in the `svgico` folder to SVG sprite
- Build
  - `npm run build:pug` – builds the source Pug files in production mode.
  - `npm run build:scss` – builds the source SCSS files in production mode.
  - `npm run build:js` – builds the source JS files in production mode.
  - `npm run build:images` – builds the source images in production mode.
  - `npm run build:fonts` – builds the fonts.
- Linters
  - Lint:
    - `npm run lint:scss` – starts checking for errors in SCSS code.
    - `npm run lint:js` – starts checking for errors in JS code.
    - `npm run lint:pug` – starts checking for errors in Pug code.
  - Fix:
    - `npm run lint:scss --fix` – fixes all errors in SCSS code.
    - `npm run lint:js --fix` – fixes all errors in JS code.
- GitHub Pages
  - `npm run build:gh-pages` – builds the project and automatically creates the GitHub Pages repository.
  - `npm run gh-pages` – automatically creates the GitHub Pages repository without build the project.

## Project file structure

```
gulp-joseffie-settings
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
|    |— pug/
|    |—   |— index.pug
|    |— svgico/
|    |— vendor/
| .babelrc
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
| gulpfile.babel.js
| package-lock.json
| package.json
```

- Root:
  - `.babelrc` – Babel settings.
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
  - `gulpfile.babel.js` — settings for Gulp.
  - `package.json` — a list of dependencies.
- The `src` folder is used to develop and store source files:
  - `src/base` — folder that stores the base Pug layout, core SCSS, JS, and data.json files.
  - `src/components` — folder that stores BEM components.
  - `src/fonts` — folder that stores fonts.
  - `src/img` — folder that stores images.
  - `src/mixins` — folder that stores Pug and SCSS mixins.
  - `src/pug` — folder that stores Pug pages.
  - `src/svgico` — folder that stores SVG images that are compiled into a sprite.
  - `src/vendor` — folder that stores library style files.
- The `dist` folder contains the final build files.
- The `gulp` folder contains Gulp tasks.

## Recommendations for use

### Text data storage (improvised database)

In order not to litter the code of Pug files with text data, it is worth moving all the texts into a separate file. Texts mean, for example, the text of an article or any lists, or the same menu items in the header, in the footer, in the sidebar, etc. All this leads to readability of the code, and it will be easier to fix errors when everything is in one place.

You can store all texts in the `data.json` file (`src/base/data/data.json`). HTML markup is valid, but Pug must use output interpolation `!=` to output it. For example, `p!= variable`. The data.json file is already included in all Pug files by default and is parsed by the Pug task, so there is no need to make additional connections.

If you need to use this feature, you must create an array of objects and fill it with all the text information. Let's look at an example of using data.json to create a simple list.

First, we enter the text of the list items in data.json:

```json
{
  "someList": [
    { "text": "Some interesting text" },
    { "text": "Other interesting text" },
    { "text": "Text that wants to <br> wrap to a new line" }
  ]
}
```

Then we can iterate over the given array in Pug with its built-in `each in` loop:

```pug
ul
  each item in someList
    li!= item.text
```

The end result of this code will be this HTML markup:

```html
<ul>
  <li>Some interesting text</li>
  <li>Other interesting text</li>
  <li>
    Text that wants to <br />
    wrap to a new line
  </li>
</ul>
```

### Component approach

Each block that needs to be make up out is created as a component. All components are in the `src/components` directory. The component includes 3 types of files - `.pug`, `.scss`, `.mjs`. The name of the file names is used with the name of the component. All this is made for easy reuse. For example, components with this approach are easily copied from project to project.

Here is an example of creating a header component structure with its files.

```ruby
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

- The project pages are located in the `src/pug` folder.
  - Each page (including the main one) inherits one template `src/base/pug/base.pug`.
  - Main page: `src/pug/index.pug`.

#### Active class for link

If you need to highlight the active page on the site, then in the current page file, after the expression `append variables`, specify `var menuHref = 'linkHref'`. It is important that the value of this variable matches the value of the `link` property of the link object you need in the `mainmenuData` array specified in `src/base/data/data.json`. For example:

You have navigation in the header of the main page `index.pug`. You want to highlight one of the links by giving it the class active and styling the active link in SCSS. Let it be a link with the text "Main".

In the navigation list array `mainmenuData`, among other links, look for a link with the text "Main", specify the link you need in the `link` property:

```json
{
  "mainmenuData": [
    {
      "text": "Main",
      "link": "index.html"
    },
    {
      "text": "About us",
      "link": "#"
    },
    {
      "text": "services",
      "link": "#"
    }
  ]
}
```

Then in the `index.pug` file, in the value of the `var menuHref` variable, specify the link that you specified in the `link` property in the JSON file above:

```pug
append variables
  var menuHref = 'index.html'
```

Now everything is working. The link is highlighted as active.

How does it work? In fact, everything is very simple. The list item mixin specified in the `main-nav.pug` component file declares an `activeClass` variable that compares the values ​​of the `menuHref` variable and the `link` property. If the values ​​match, the link is assigned the class `is-active`.

```pug
mixin menuItem(item)
  - var activeClass = menuHref === item.link ? " is-active" : "";
  li.main-nav__item(class= activeClass)
```

### Fonts

- The fonts are located in the `src/fonts` folder.
  - You can use otf, ttf, woff, woff2 formats.
  - Important: for the task to work, the font files must follow the following format: "Font Name - Font Shape". For example: "Roboto-Regular" or "IbarraRealNova-MediumItalic".
  - To compile the fonts, use the command `npm run fonts`.
  - After using the command, in the `src/base/scss` folder will appear the `_fonts.scss` file.
  - To use local fonts, don't forget to uncomment the 5th line in `src/base/scss/main.scss`.

### Creating SVG sprites

For better performance of the final layout, SVG icon files are best combined into sprites. This is pretty easy to do here.

First you need to move all your SVG icons inside `src/svgico`. In this directory you will find two folders: `mono` and `multi`. My build uses the division of sprites into single-color and multi-color in order to remove their unnecessary attributes from each type of SVG icon and, for example, it is easier to interact with the Shadow DOM. If your SVG has only one color, put it in the `mono` folder, otherwise in `multi`.

Then run the `npm run sprite` script, which will automatically create sprites for each SVG type separately. The resulting sprites will be generated in the `src/img/sprites` folder.

Then in the Pug file, you can insert an icon using the `+icon('iconName', 'iconType', width, height)` mixin. "IconName" is the name of the SVG icon file. "IconType" is the type of the SVG icon, if the icon is single-color, then the type is `mono`, if the icon is multi-color, then `multi`. Width and height are optional arguments to the mixin. If you want to add a class or any other attribute, then simply put it in parentheses after the "body" of the mixin:

```pug
+icon('icon', 'mono')(class='logo__icon', aria-label='Icon')
```

### Code linting

Pug-linter, Stylelint, ESlint are integrated into the assembly. They allow you to automatically check your code for errors, and also force you to follow a rigid code guide, which leads to good readability of your code.

For more convenient work with linters, you should install the `Stylelint`, `ESLint`, `puglint` extensions in your IDEs. To make sure your code is automatically formatted on save, I also recommend installing the `Prettier` extension.

The work of linters is determined by the corresponding configs. For Pug this is `.pug-lintrc.json`, for SCSS it is `.stylelintrc.json`, for JS it is `.eslintrc.json`.

Linters automatically fix your mistakes if you commit. But you can also check or fix the code manually using commands.

```console
  - `npm run lint:scss` – starts checking for errors in SCSS code.
  - `npm run lint:js` – starts checking for errors in JS code.
  - `npm run lint:pug` – starts checking for errors in Pug code.
```

```console
  - `npm run lint:scss --fix` – fixes all errors in SCSS code.
  - `npm run lint:js --fix` – fixes all errors in JS code.
```

Unfortunately, automatic linting of Pug code is not available because the Pug-linter developer did not implement the `--fix` flag. So in the case of Pug, you will have to use `npm run lint-pug` and fix errors manually with it. At least for now.

### Deploy to GitHub Pages

If you need to place your project in a Git repository and use GitHub Pages to show the layout result, for example, to a customer, then my build allows you to do this.

To host your project on GitHub pages, you need to create a Git repository and add your project to it. Folders like `dist` and `node_modules` will not get into the repository thanks to `.gitignore`.

After placing the project sources, you should use the `npm run build:gh-pages` command to build the project in production mode and put the finished layout on GitHub pages. If you have already built the project using `npm run build`, you can use `npm run gh-pages`.

You can now navigate to your GitHub page at `username.github.io/repository-name`.
