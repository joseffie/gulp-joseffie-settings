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
export const CREATE_FONT_STYLES_FILE = async () => {
  let fontsFile = `${$.paths.srcFolder}/base/scss/_fonts.scss`;

  $.plugins.fs.readdir(`${$.paths.srcFolder}/fonts`, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!$.plugins.fs.existsSync(fontsFile)) {
        $.plugins.fs.writeFile(fontsFile, '', () => {});
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];
          const fontFileExtension = fontsFiles[i].split('.')[1];

          //  Skip file if it is not a font
          if (
            fontFileExtension !== 'otf' &&
            fontFileExtension !== 'ttf' &&
            fontFileExtension !== 'woff' &&
            fontFileExtension !== 'woff2'
          ) {
            console.log(
              $.plugins.chalk.yellow.bold(
                `[${fontFileName}.${fontFileExtension}] is not a font. Continue.`,
              ),
            );
            // eslint-disable-next-line no-continue
            continue;
          }

          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            const fontType = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            const lowerFontType = fontType.toLowerCase();

            // Declaring variables for the font-weight and font-style properties
            let fontWeight;
            let fontStyle = 'normal';

            switch (lowerFontType) {
              case 'thin':
                fontWeight = 100;
                break;
              case 'thinitalic':
                fontWeight = 100;
                fontStyle = 'italic';
                break;
              case 'extralight':
                fontWeight = 200;
                break;
              case 'extralightitalic':
                fontWeight = 200;
                fontStyle = 'italic';
                break;
              case 'light':
                fontWeight = 300;
                break;
              case 'lightitalic':
                fontWeight = 300;
                fontStyle = 'italic';
                break;
              case 'book':
                fontWeight = 350;
                break;
              case 'bookitalic':
                fontWeight = 350;
                fontStyle = 'italic';
                break;
              case 'retina':
                fontWeight = 450;
                break;
              case 'retinaitalic':
                fontWeight = 450;
                fontStyle = 'italic';
                break;
              case 'medium':
                fontWeight = 500;
                break;
              case 'mediumitalic':
                fontWeight = 500;
                fontStyle = 'italic';
                break;
              case 'semibold':
                fontWeight = 600;
                break;
              case 'semibolditalic':
                fontWeight = 600;
                fontStyle = 'italic';
                break;
              case 'bold':
                fontWeight = 700;
                break;
              case 'bolditalic':
                fontWeight = 700;
                fontStyle = 'italic';
                break;
              case 'extrabold':
              case 'heavy':
                fontWeight = 800;
                break;
              case 'extrabolditalic':
              case 'heavyitalic':
                fontWeight = 800;
                fontStyle = 'italic';
                break;
              case 'black':
                fontWeight = 900;
                break;
              case 'blackitalic':
                fontWeight = 900;
                fontStyle = 'italic';
                break;
              case 'regularitalic':
                fontWeight = 400;
                fontStyle = 'italic';
                break;
              default:
                fontWeight = 400;
            }

            $.plugins.fs.appendFile(
              fontsFile,
              // eslint-disable-next-line max-len
              `@font-face {\n\tfont-weight: ${fontWeight};\n\tfont-family: ${fontName};\n\tfont-style: ${fontStyle};\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff'), url('../fonts/${fontFileName}.ttf') format('ttf');\n\tfont-display: swap;\n}\r\n`,
              () => {},
            );
            newFileOnly = fontFileName;
          } else {
            console.log(
              $.plugins.chalk.yellow(
                'The file already exists. To update a file, it will be deleted',
              ),
            );
          }
        }
      }
    }
  });
};

export const convertFonts = gulp.series(otfToTtf, ttfToWoff, CREATE_FONT_STYLES_FILE);

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
