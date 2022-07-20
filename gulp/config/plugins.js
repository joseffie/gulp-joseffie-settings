import replace from 'gulp-replace';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import rename from 'gulp-rename';
import newer from 'gulp-newer';
import del from 'del';
import ifPlugin from 'gulp-if';

import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import pugPlugin from 'gulp-pug';
import fs from 'fs';
import data from 'gulp-data';

export const plugins = {
  replace,
  plumber,
  notify,
  rename,
  newer,
  del,
  webpHtmlNosvg,
  versionNumber,
  fs,
  data,
  pug: pugPlugin,
  if: ifPlugin,
};
