import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';
const archiveFolder = './.archive';

const paths = {
  build: {
    js: `${buildFolder}/js`,
    css: `${buildFolder}/css`,
    html: `${buildFolder}`,
    images: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    pug: `${srcFolder}/pages`,
    scss: [`${srcFolder}/base/scss/*.{sass,scss}`, `!${srcFolder}/base/scss/_*.{sass,scss}`],
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
    iconsmono: `${srcFolder}/svgico/mono/*.svg`,
    iconsmulti: `${srcFolder}/svgico/multi/*.svg`,
    data: `${srcFolder}/base/data/*.{json,jsonc}`,
  },
  buildFolder,
  srcFolder,
  archiveFolder,
  rootFolder,
};

export default paths;
