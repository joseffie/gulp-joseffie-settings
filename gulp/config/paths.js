import { dirs, availableFontFormats } from '../../app.config.cjs';

const { dist: dest, src: source } = dirs;
const fontExts = availableFontFormats.length > 1
  ? `{${availableFontFormats.join(',')}}`
  : availableFontFormats.join('');

export const dist = {
  html: dest,
  styles: `${dest}/styles`,
  scripts: `${dest}/scripts`,
  images: `${dest}/img`,
  fonts: `${dest}/fonts`,
};

export const src = {
  pug: `${source}/views/**/*.pug`,
  styles: [
    `${source}/base/styles/*.{sass,scss}`,
    `!${source}/base/styles/_*.{sass,scss}`,
  ],
  scripts: [
    `${source}/base/scripts/*.js`,
    `!${source}/base/scripts/_*.js`,
  ],
  images: `${source}/img/**/*.{jpg,jpeg,png,gif,ico,webp}`,
  fonts: `${source}/fonts/**/*.${fontExts}`,
  svg: `${source}/img/**/*.svg`,
  icons: {
    mono: `${source}/svgico/mono/*.svg`,
    multi: `${source}/svgico/multi/*.svg`,
  },
};

export const watch = {
  pug: `${source}/**/*.pug`,
  styles: `${source}/**/*.{sass,scss}`,
  scripts: `${source}/**/*.js`,
  images: `${source}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  fonts: `${source}/fonts/**/*.${fontExts}`,
  icons: {
    mono: `${source}/svgico/mono/*.svg`,
    multi: `${source}/svgico/multi/*.svg`,
  },
  data: `${source}/base/data/*.json`,
};
