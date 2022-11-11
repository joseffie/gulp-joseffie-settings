/* eslint-disable array-callback-return */

//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

export const createFontStylesFile = async () => {
  const { fs } = $.plugins;
  const fontsFile = `${$.paths.srcFolder}/base/styles/_fonts.scss`;

  if (fs.existsSync(fontsFile)) {
    return console.log(
      'The font styles file exists, no operation is required.',
      '\nIf you have added new fonts, delete the \'src/base/styles/_fonts.scss\' file and try again.',
    );
  }

  fs.readdir(`${$.paths.srcFolder}/fonts`, (_, fontFiles) => {
    let fontFound = false;

    for (let i = 0; i < fontFiles.length; i++) {
      const extension = fontFiles[i].slice((fontFiles[i].lastIndexOf('.') - 1 >>> 0) + 2);

      if (['otf', 'ttf', 'woff', 'woff2'].includes(extension)) {
        fontFound = true;
        break;
      }
    }

    if (!fontFound) return console.log('No local fonts found.');

    if (!fs.existsSync(fontsFile)) {
      fs.writeFile(fontsFile, '', () => { });
      let currentFile;
      let fontsList = {};

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

        if (currentFile !== fontFileName) {
          //  Skip file if it is not a font
          if (!['otf', 'ttf', 'woff', 'woff2'].includes(fontFileExtension)) {
            console.log(
              $.plugins.chalk.yellow(
                `[${fontFileName}.${fontFileExtension}] is in an unsupported format or is not a font. Continue.`,
              ),
            );

            continue;
          }

          const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
          const fontType = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
          const lowerFontType = fontType.toLowerCase();
          let iterationMessage = '';

          fontsList[fontFileName] = {};
          const font = fontsList[fontFileName];

          font.name = fontName;
          font.ext = [];
          font.ext.push(fontFileExtension);
          font.fontWeight = 400;
          font.fontStyle = 'normal';

          // Determining the value of `font-weight`
          Object.entries(fontWeightMap).map(([key, value]) => {
            if (lowerFontType.indexOf(key) !== -1) {
              iterationMessage += `Current (${fontName}): [${key}: ${value}].`;
              font.fontWeight = value;
            }
          });

          if (lowerFontType === 'italic') {
            iterationMessage += `Current (${fontName}): [regular: 400].`;
            font.fontWeight = 400;
          }

          // If the font type in the file name contains `italic`,
          // the value of `font-style` is defined as 'italic'
          if (lowerFontType.indexOf('italic') !== -1) {
            iterationMessage += ' Defined as italic.';
            font.fontStyle = 'italic';
          }

          console.log(iterationMessage);

          currentFile = fontFileName;
        } else fontsList[fontFileName].ext.push(fontFileExtension);
      }

      Object.entries(fontsList).map(([key, value]) => {
        const extensions = {
          otf: '',
          ttf: '',
          woff: '',
          woff2: '',
        };
        let src = [];

        for (let i = 0; i < value.ext.length; i++) {
          Object.keys(extensions).map((ext) => {
            if (value.ext[i] === ext) {
              src.push(`url('../fonts/${key}.${value.ext[i]}') format('${value.ext[i]}')`);
            }
          });
        }

        fs.appendFile(
          fontsFile,
          // eslint-disable-next-line max-len
          `@font-face {\n  font-weight: ${value.fontWeight};\n  font-family: ${value.name};\n  font-style: ${value.fontStyle};\n  src: ${src.join(', ')};\n  font-display: swap;\n}\n`,
          () => { },
        );
      });
    }
  });
};
