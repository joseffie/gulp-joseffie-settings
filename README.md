# Gulp-Settings: Gulp + Webpack build for Web Development

## Capabilities
- Component approach to work: the structure of component files is implemented according to BEM.
- Automatic creation of component directories with files using the [bem-tools-create](https://github.com/bem-tools/bem-tools-create) tool.
- Using the Pug HTML-preprocessor.
- Using the SCSS CSS-preprocessor.
- Using Webpack to build JavaScript modules.
- Automatic assembly of SVG icons into sprites using Gulp.
- Checking JS code for errors with ESLint linter.
- Authomatic convert images to modern Webp format.
- Starter template for a quick start of layout.

## Instalation
You will need to download and install [node.js](https://nodejs.org/en/) for the build to work.

Also install the [Git](https://git-scm.com/downloads) version control system. Git is not necessary for building work, but for better installation and further development, it is better to install it anyway.

To install (clone the repository) to the current folder from the console, enter the command:
`git clone https://github.com/zoseffie/Gulp-Settings.git`

> Write all commands strictly from the root of the project.

After all the sources have been downloaded from the remote repository, enter the `npm install` command in the console to install the project. All dependencies will be installed automatically.

You need to install gulp global, but that's if you haven't already done so in other projects.

`npm i gulp -g`

This procedure is performed once and the next time a new project is implemented, it is not necessary to repeat this command.

## Launch and main commands
When all the dependencies have been installed, to run the project, it is enough to write `npm run dev` in the console. If there are no errors, then by default the http://localhost:3000 domain will launch with the start layout template.

### Additional commands
In the package.json file, in the `scripts` section, you will find the commands to run the project:
- `dev` - starts the project in development mode.
- `build` - runs the project in production mode, copying files to the "dist" folder.
- `clean` - removes the "dist" folder if it exists.
- `fonts` - converts the fonts placed in the "fonts" folder into several browser-friendly formats and creates a file with font-face included.
- `sprite` - converts SVG icons placed in the "svgico" folder to SVG sprite
- `zip` - archives the project in production mode (TIP: I will rewrite this task in the future).

To run a command in the console, write `npm run command_name`, for example:

`npm run fonts`

## Project file structure
Your_Project
```
|— dist
|— gulp
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
|    |    |    |— _settings.scss
|    |    |    |— _variables.scss
|    |    |    |— main.sass
|    |— components
|    |    |— ***
|    |    |— ***
|    |    |— ***
|    |    |— components.scss
|    |    |— components.mjs
|    |— fonts
|    |    |— ***
|    |— mixins
|    |    |— scss
|    |— vendor
|    |    |— normalize.scss
|    index.pug
| .babelrc
| .bemrc.js
| .editorconfig
| .eslintignore
| .eslintrc.json
| .gitignore
| .prettierignore
| gulpfile.js
| package.json
| webpack.config.js
```
Description of files a bit later.

## Work with build
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

The first step is to install the bem-tools-core plugin globally, otherwise we might get an error that the bem command is not recognized.

` npm i bem-tools-core -g `

This command is written once for all projects. No more need to repeat.

To create a component, you need to write a command in the console:

` bem create component-name `

In this case, "component-name" is the name of the component being created. After this command, a folder with the created component will appear in the `src/components` directory. In the default folder of the component, 3 file types with the same name are created - pug, sсss, mjs. That is, in this case, `component-name.pug`, `component-name.scss`, `component-name.js`.

If it is necessary to exclude any file, then it is necessary to add `-n extension` after the command declaration. For example:

` bem create component-name -n mjs `

After this command, a component is created with .pug and .scss files. The .mjs file will be excluded.

If you need to create only one type of file, for example, only pug, then add the `-T` flag before the file extension:

` bem create -T pug `

Detailed bem-tools-create documentation [is here](https://github.com/bem-tools/bem-tools-create)

## Detailed build documentation is still being written...

