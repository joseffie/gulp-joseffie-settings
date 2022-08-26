//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

import gulp from 'gulp';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// Convert otf fonts to ttf format
export const otfToTtf = () =>
  $.gulp
    .src(`${$.paths.srcFolder}/fonts/*.otf`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS [otf to ttf]',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['ttf'],
      }),
    )
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`));

// Convert ttf fonts to woff & woff2 formats
export const ttfToWoff = () =>
  $.gulp
    .src(`${$.paths.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS [ttf to woff]',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      fonter({
        formats: ['woff'],
      }),
    )
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`))
    .pipe($.gulp.src(`${$.paths.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe($.gulp.dest(`${$.paths.srcFolder}/fonts`));

// Creating a file with @font-face declarations
const createFontStylesFile = async () => {
  let fontsFile = `${$.config.path.srcFolder}/base/styles/_fonts.scss`;

  $.plugins.fs.readdir(`${$.config.path.srcFolder}/fonts`, (_, fontFiles) => {
    if (fontFiles) {
      if (!$.plugins.fs.existsSync(fontsFile)) {
        $.plugins.fs.writeFile(fontsFile, '', () => {});
        let currentFile;

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
          const fontFileExtension = fontFiles[i].split('.')[1];

          if (currentFile !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            const fontType = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            const lowerFontType = fontType.toLowerCase();

            let outStyles = {
              fontWeight: 400,
              fontStyle: 'normal',
            };

            //  Skip file if it is not a font
            if (
              fontFileExtension !== 'otf' &&
              fontFileExtension !== 'ttf' &&
              fontFileExtension !== 'woff' &&
              fontFileExtension !== 'woff2'
            ) {
              console.log(
                $.plugins.chalk.yellow(
                  `[${fontFileName}.${fontFileExtension}] is in an unsupported format or is not a font. Continue.`,
                ),
              );
              // eslint-disable-next-line no-continue
              continue;
            }

            // Determining the value of `font-weight`
            // eslint-disable-next-line array-callback-return
            Object.entries(fontWeightMap).map(([key, value]) => {
              if (lowerFontType.indexOf(key) !== -1) {
                console.log(`Current iteration: [${key}: ${value}].`);
                outStyles.fontWeight = value;
              }
            });

            if (lowerFontType === 'italic') {
              console.log('Current iteration: [regular: 400]');
              outStyles.fontWeight = 400;
            }

            // If the font type in the file name contains `italic`,
            // the value of `font-style` is defined as 'italic'
            if (lowerFontType.indexOf('italic') !== -1) {
              console.log('Defined as italic.');
              outStyles.fontStyle = 'italic';
            }

            $.plugins.fs.appendFile(
              fontsFile,
              // eslint-disable-next-line max-len
              `@font-face {\n\tfont-weight: ${outStyles.fontWeight};\n\tfont-family: ${fontName};\n\tfont-style: ${outStyles.fontStyle};\n\tsrc: url('../assets/fonts/${fontFileName}.woff2') format('woff2'), url('../assets/fonts/${fontFileName}.woff') format('woff'), url('../assets/fonts/${fontFileName}.ttf') format('ttf'), url('../assets/fonts/${fontFileName}.otf') format('otf');\n\tfont-display: swap;\n}\n`,
              () => {},
            );

            currentFile = fontFileName;
          } else {
            console.log($.plugins.chalk.yellow('Refreshing `_fonts.scss` file...'));
          }
        }
      }
    }
  });
};

export const convertFonts = gulp.series(otfToTtf, ttfToWoff, createFontStylesFile);

export const fonts = async () =>
  $.gulp
    .src($.paths.src.fonts)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS',
          message: 'You got an error: <%= error.message %>',
        }),
      ),
    )
    .pipe($.gulp.dest($.paths.build.fonts));
