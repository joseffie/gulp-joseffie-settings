// This file contains some common installed plugins that are found in many tasks.
// To use a plugin inside a task, use `$.plugins.pluginName`

// If you are using the plugin outside of an export
// function/variable, then import `config/plugins.js` into
// this file and use `plugins.pluginName`

import browsersync from 'browser-sync';
import chalk from 'chalk';
import data from 'gulp-data';
import { deleteSync } from 'del';
import emitty from 'emitty';
import fs from 'fs';
import gulpIf from 'gulp-if';
import logger from 'gulplog';
import newer from 'gulp-newer';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

const plugins = {
  browsersync,
  chalk,
  data,
  emitty,
  fs,
  logger,
  newer,
  notify,
  plumber,
  rename,
  replace,
  del: deleteSync,
  if: gulpIf,
};

export default plugins;
