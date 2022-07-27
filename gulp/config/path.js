import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js`,
    css: `${buildFolder}/css`,
    html: `${buildFolder}`,
    images: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    pug: `${srcFolder}/pug`,
    scss: `${srcFolder}/base/scss/main.scss`,
    js: `${srcFolder}/base/js/index.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    fonts: `${srcFolder}/fonts/**/*.{otf,ttf,woff,woff2}`,
    svg: `${srcFolder}/img/**/*.svg`,
    iconsmono: `${srcFolder}/svgico/mono/*.svg`,
    iconsmulti: `${srcFolder}/svgico/multi/*.svg`,
  },
  watch: {
    js: `${srcFolder}/**/*.{js,mjs}`,
    scss: `${srcFolder}/**/*.scss`,
    pug: `${srcFolder}/**/*.pug`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
    fonts: `${srcFolder}/fonts/**/*.{otf,ttf,woff,woff2}`,
    data: `${srcFolder}/base/data/*.{json,jsonc}`,
  },
  buildFolder,
  srcFolder,
  rootFolder,
  clean: buildFolder,
};
