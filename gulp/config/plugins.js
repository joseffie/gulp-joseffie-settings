import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import browsersync from 'browser-sync';
import newer from 'gulp-newer';
import del from 'del';
import ifPlugin from 'gulp-if';

import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pugPlugin from 'gulp-pug';
import fs from 'fs';
import data from 'gulp-data';

export const plugins = {
  replace: replace,
  plumber: plumber,
  notify: notify,
  browsersync: browsersync,
  newer: newer,
  del: del,
  webpHtmlNosvg: webpHtmlNosvg,
  versionNumber: versionNumber,
  fs: fs,
  data: data,
  pug: pugPlugin,
  if: ifPlugin,
};
