const { resolve, basename } = require('path');

const dirs = {
  root: basename(resolve()),
  dist: 'dist',
  src: 'src',
  archive: '.archive',
};
exports.dirs = dirs;

const isProd = process.argv.includes('--production');
exports.isProd = isProd;

exports.serverPort = 9050;
exports.reloadDebounce = 100;
exports.availableFontFormats = ['otf', 'ttf', 'woff', 'woff2'];

/**
 * Split font name if it contains more than one word
 * @type { boolean }
 * @example
 * 'IbarraRealNova' -> 'Ibarra Real Nova', if true
 * 'IbarraRealNova' -> 'IbarraRealNova', if false
 */
exports.separateMultiwordFontNames = true;

/**
 * SCSS file storing @font-face declarations
 * @type { string }
 */
exports.scssFontsFile = `${dirs.src}/base/styles/_fonts.scss`;

/**
 * Directories or files to delete when starting development or build
 * @type { string | string[] }
 * @see https://github.com/sindresorhus/del/blob/main/readme.md#deletesyncpatterns-options
 */
exports.pathsToDelete = [dirs.dist];

// Sorting type CSS media queries: 'desktop-first' || 'mobile-first'
exports.sortingMediaQueriesMode = 'desktop-first';

exports.environment = isProd ? 'production' : 'development';
