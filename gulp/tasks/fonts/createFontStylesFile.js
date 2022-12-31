//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

import { success, warn, log } from '../../utils/logger.js';

export const createFontStylesFile = async () => {
  log('Getting started.');

  const { fs } = $.plugins;
  const fontsFile = `${$.paths.srcFolder}/base/styles/_fonts.scss`;

  if (fs.existsSync(fontsFile)) {
    warn('The font styles file exists, no operations is required');
    warn('If you have added new fonts, delete the \'src/base/styles/_fonts.scss\' file and try again.');
    return;
  }

  fs.readdir(`${$.paths.srcFolder}/fonts`, async (_, fontFiles) => {
    let fontFound = false;

    for (let i = 0; i < fontFiles.length; i++) {
      const extension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

      if (['otf', 'ttf', 'woff', 'woff2'].includes(extension)) {
        fontFound = true;
        break;
      }
    }

    if (!fontFound) return success('No local fonts found.');

    if (!fs.existsSync(fontsFile)) {
      log('Starting creating _fonts.scss...');
      fs.writeFile(fontsFile, '', () => { });

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
        if (!['otf', 'ttf', 'woff', 'woff2'].includes(fontFileExtension)) {
          warn(`${fontFileName}.${fontFileExtension} is in an unsupported font format or is not a font.`);
          continue;
        }

        if (lastFileName !== fontFileName) {
          const fontName = fontFileName.split('-')[0];
          const fontType = fontFileName.split('-')[1];
          const lowerFontType = fontType.toLowerCase();
          let iterationMessage = '';

          fontsList[fontFileName] = {};
          const font = fontsList[fontFileName];

          font.name = fontName;
          font.extensions = [fontFileExtension];
          font.weight = 400;
          font.style = 'normal';

          // Determining the value of `font-weight`
          Object.entries(fontWeightMap).forEach(([key, value]) => {
            if (lowerFontType.indexOf(key) !== -1) {
              iterationMessage += `Current (${fontFileName}): [${key}: ${value}].`;
              font.weight = value;
            }
          });

          if (lowerFontType === 'italic') {
            iterationMessage += `Current (${fontFileName}): [regular: 400].`;
            font.weight = 400;
          }

          // If the font type in the file name contains `italic`,
          // the value of `font-style` is defined as 'italic'
          if (lowerFontType.indexOf('italic') !== -1) {
            iterationMessage += ' Defined as italic.';
            font.style = 'italic';
          }

          log(iterationMessage);

          lastFileName = fontFileName;
        } else fontsList[fontFileName].extensions.push(fontFileExtension);
      }

      Object.entries(fontsList).forEach(([fullname, options]) => {
        const src = [];

        for (let i = 0; i < options.extensions.length; i++) {
          const ext = options.extensions[i];

          if (['otf', 'ttf', 'woff', 'woff2'].includes(ext)) {
            src.push(`url('../fonts/${fullname}.${ext}') format('${ext}')`);
          }
        }

        fs.appendFile(
          fontsFile,
          // eslint-disable-next-line max-len
          `@font-face {\n  font-weight: ${options.weight};\n  font-family: ${options.name};\n  font-style: ${options.style};\n  src: ${src.join(', ')};\n  font-display: swap;\n}\n`,
          () => { },
        );
      });

      return success('_fonts.scss has been created successfully.');
    }

    return null;
  });
};
