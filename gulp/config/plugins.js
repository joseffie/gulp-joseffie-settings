// This file contains all installed plugins.
// To use a plugin inside a task, use `$.plugins.pluginName`

// If you are using the plugin outside of an export
// function/variable, then import `config/plugins.js` into
// this file and use `plugins.pluginName`

import autoprefixer from 'gulp-autoprefixer';
import browsersync from 'browser-sync';
import cleanCss from 'gulp-clean-css';
import dartSass from 'sass';
import data from 'gulp-data';
import del from 'del';
import emitty from 'emitty';
import fonter from 'gulp-fonter';
import fs from 'fs';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import gulpIf from 'gulp-if';
import gulpSass from 'gulp-sass';
import gulpPug from 'gulp-pug';
import gulpZip from 'gulp-zip';
import imagemin from 'gulp-imagemin';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import svgSprite from 'gulp-svg-sprite';
import ttf2woff2 from 'gulp-ttf2woff2';
import versionNumber from 'gulp-version-number';
import webp from 'gulp-webp';
import webpackStream from 'webpack-stream';
import webpCss from 'gulp-webpcss';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

// Sass initialization
const sass = gulpSass(dartSass);

export const plugins = {
  autoprefixer,
  browsersync,
  cleanCss,
  data,
  del,
  emitty,
  fonter,
  fs,
  imagemin,
  newer,
  notify,
  plumber,
  rename,
  replace,
  sass,
  svgSprite,
  ttf2woff2,
  versionNumber,
  webp,
  webpCss,
  webpHtmlNosvg,
  groupMedia: groupCssMediaQueries,
  if: gulpIf,
  pug: gulpPug,
  webpack: webpackStream,
  zip: gulpZip,
};
