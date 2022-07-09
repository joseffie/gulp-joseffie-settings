import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/img/`,
    fonts: `${srcFolder}/fonts/`,
  },
  src: {
    pug: [`${srcFolder}/*.pug`, `${srcFolder}/pages/*.pug`],
    scss: `${srcFolder}/base/scss/main.scss`,
    js: `${srcFolder}/base/js/index.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgico/*.svg`,
  },
  watch: {
    js: `${srcFolder}/**/*.{js,mjs}`,
    scss: `${srcFolder}/**/*.scss`,
    pug: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    data: `${srcFolder}/base/data/*.{json,jsonc}`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
