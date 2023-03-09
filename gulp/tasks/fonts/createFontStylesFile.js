//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

import {
  existsSync, readdir, writeFile, appendFile,
} from 'fs';
import { relative } from 'path';
import {
  dirs, availableFontFormats, scssFontsFile, separateMultiwordFontNames,
} from '../../../app.config.cjs';
import { success, warn, log } from '../../utils/logger.js';

const { src, dist } = dirs;

function separateName(str, separateMultiwords = false) {
  const converted = str.match(/([A-Z]?[^A-Z]*)/g).slice(0, -1);

  if (converted.length <= 1) return str;

  return separateMultiwords ? `'${converted.join(' ')}'` : str;
}

export const createFontStylesFile = async () => {
  log('Getting started.');

  if (existsSync(scssFontsFile)) {
    warn('The font styles file exists, no operations is required');
    warn(
      `If you have added new fonts, delete the '${src}/base/styles/_fonts.scss' file and try again.`,
    );

    return;
  }

  readdir(`${src}/fonts`, async (_, fontFiles) => {
    let fontFound = false;

    for (let i = 0; i < fontFiles.length; i++) {
      const extension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

      if (availableFontFormats.includes(extension)) {
        fontFound = true;
        break;
      }
    }

    if (!fontFound) return success('No local fonts found.');

    if (!existsSync(scssFontsFile)) {
      log('Starting creating _fonts.scss...');
      writeFile(scssFontsFile, '', () => { });

      let lastFileName = null;
      const fontsList = {};
      const fontWeightMap = {
        thin: 100,
        extralight: 200,
        light: 300,
        book: 350,
        regular: 400,
        retina: 450,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        heavy: 800,
        black: 900,
      };

      for (let i = 0; i < fontFiles.length; i++) {
        const fontFileName = fontFiles[i].split('.')[0];
        const fontFileExtension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

        // Skip file if it is not a font
        if (!availableFontFormats.includes(fontFileExtension)) {
          warn(`${fontFileName}.${fontFileExtension} is in an unsupported font format or is not a font.`);
          continue;
        }

        if (lastFileName !== fontFileName) {
          const fontName = separateName(fontFileName.split('-')[0], separateMultiwordFontNames);
          const fontType = fontFileName.split('-')[1];
          const lowerFontType = fontType.toLowerCase();
          const iterationMessage = [];

          fontsList[fontFileName] = {};
          const font = fontsList[fontFileName];

          font.name = fontName;
          font.extensions = [fontFileExtension];
          font.weight = 400;
          font.style = 'normal';

          // Determining the value of `font-weight`
          Object.entries(fontWeightMap).forEach(([key, value]) => {
            if (lowerFontType.indexOf(key) !== -1) {
              iterationMessage.push(`Current (${fontFileName}): [${key}: ${value}].`);
              font.weight = value;
            }
          });

          if (lowerFontType === 'italic') {
            iterationMessage.push(`Current (${fontFileName}): [regular: 400].`);
            font.weight = 400;
          }

          // If the font type in the file name contains 'italic',
          // the value of 'font-style' is defined as 'italic'
          if (lowerFontType.indexOf('italic') !== -1) {
            iterationMessage.push('Defined as italic.');
            font.style = 'italic';
          }

          // Print information about the current iteration (font)
          log(iterationMessage.join(' '));

          lastFileName = fontFileName;
        } else fontsList[fontFileName].extensions.push(fontFileExtension);
      }

      Object.entries(fontsList).forEach(([fullname, options]) => {
        const source = [];

        for (let i = 0; i < options.extensions.length; i++) {
          const ext = options.extensions[i];

          if (availableFontFormats.includes(ext)) {
            const urlToFont = relative(
              `${dist}/styles`,
              `${dist}/fonts/${fullname}.${ext}`,
            ).replaceAll(/\\/g, '/');

            source.push(`url('${urlToFont}') format('${ext}')`);
          }
        }

        appendFile(
          scssFontsFile,
          // eslint-disable-next-line max-len
          `@font-face {\n  font-weight: ${options.weight};\n  font-family: ${options.name};\n  font-style: ${options.style};\n  src: ${source.join(', ')};\n  font-display: swap;\n}\n`,
          () => { },
        );
      });

      return success('_fonts.scss has been created successfully.');
    }

    return null;
  });
};
