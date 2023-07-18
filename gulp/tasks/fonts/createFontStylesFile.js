//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

import {
  existsSync, readdirSync, appendFileSync,
} from 'fs';
import { relative } from 'path';
import {
  dirs, availableFontFormats, scssFontsFile, separateMultiwordFontNames,
} from '../../../app.config.cjs';
import { success, warn, log } from '../../utils/logger.js';

const { src, dist } = dirs;

const fontWeightMap = {
  thin: 100,
  extralight: 200,
  light: 300,
  book: 350,
  regular: 400,
  italic: 400,
  retina: 450,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  heavy: 800,
  black: 900,
};

function separateName(str, separateMultiwords = false) {
  if (!separateMultiwords) {
    return str;
  }

  return str.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1).join(' ');
}

export const createFontStylesFile = async () => {
  if (existsSync(scssFontsFile)) {
    warn('The font styles file exists, no operations is required');
    warn(`If you have added new fonts, delete the '${scssFontsFile}' file and try again.`);
    return;
  }

  const fontFiles = readdirSync(`${src}/fonts`);
  let fontFound = false;

  for (let i = 0; i < fontFiles.length; i++) {
    const extension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

    if (availableFontFormats.includes(extension)) {
      fontFound = true;
      break;
    }
  }

  if (!fontFound) {
    success('No local fonts found');
    return;
  }

  log('Starting create _fonts.scss...');

  const fontsList = {};
  let lastFileName = null;

  for (let i = 0; i < fontFiles.length; i++) {
    const fileName = fontFiles[i].split('.')[0];
    const fileExtension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

    // Skip file if it is not a font
    if (!availableFontFormats.includes(fileExtension)) {
      warn(`${fontFiles[i]} is in an unsupported font format or is not a font.`);
      continue;
    }

    if (lastFileName !== fileName) {
      const fontName = separateName(fileName.split('-')[0], separateMultiwordFontNames);
      const fullFontType = fileName.split('-')[1];
      const lowerFullFontType = fullFontType.toLowerCase();
      const fontType = lowerFullFontType.replace('italic', '');

      fontsList[fileName] = {
        name: fontName,
        extensions: [fileExtension],
        weight: fontType ? fontWeightMap[fontType] : 400,
        style: lowerFullFontType.indexOf('italic') !== -1 ? 'italic' : 'normal',
      };

      lastFileName = fileName;
    } else fontsList[fileName].extensions.push(fileExtension);
  }

  Object.entries(fontsList).forEach(([fullname, options]) => {
    const source = [];

    for (let i = 0; i < options.extensions.length; i++) {
      const ext = options.extensions[i];

      const urlToFont = relative(
        `${dist}/styles`,
        `${dist}/fonts/${fullname}.${ext}`,
      ).replaceAll(/\\/g, '/');

      source.push(`url('${urlToFont}') format('${ext}')`);
    }

    appendFileSync(
      scssFontsFile,
      [
        '@font-face {',
        `  font-weight: ${options.weight};`,
        `  font-family: '${options.name}';`,
        `  font-style: ${options.style};`,
        `  src: ${source.join(', ')};`,
        '  font-display: swap;',
        '}',
        '',
      ].join('\n'),
    );
  });

  success('_fonts.scss has been created successfully.');
};
