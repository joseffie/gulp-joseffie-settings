import * as nodePath from 'path';

const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';
const archiveFolder = './.archive';

const paths = {
  build: {
    html: buildFolder,
    styles: `${buildFolder}/styles`,
    scripts: `${buildFolder}/scripts`,
    images: `${buildFolder}/img`,
    fonts: `${buildFolder}/fonts`,
  },
  src: {
    pug: `${srcFolder}/views/**/*.pug`,
    styles: [`${srcFolder}/base/styles/*.{sass,scss}`, `!${srcFolder}/base/styles/_*.{sass,scss}`],
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
    fonts: `${srcFolder}/fonts/**/*.{otf,ttf,woff,woff2}`,
    svg: `${srcFolder}/img/**/*.svg`,
    iconsmono: `${srcFolder}/svgico/mono/*.svg`,
    iconsmulti: `${srcFolder}/svgico/multi/*.svg`,
  },
  watch: {
    pug: `${srcFolder}/**/*.pug`,
    styles: `${srcFolder}/**/*.scss`,
    scripts: `${srcFolder}/**/*.{js,mjs}`,
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
