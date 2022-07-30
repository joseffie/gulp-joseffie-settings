//                        !! IMPORTANT !!
// IF THE FILE NAME DOES NOT MATCH THE FORMAT "FONT NAME-FONT SHAPE"
// (EXAMPLE: "Roboto-Regular" or "IbarraRealNova-MediumItalic"), THEN THE SCRIPT WILL NOT WORK.
// IF THE NAME OF YOUR FONT FILE DOES NOT MATCH THE TEMPLATE, RENAME IT MANUALLY!

// Convert otf fonts to ttf format
export const otfToTtf = () => {
  return $.gulp
    .src(`${$.path.srcFolder}/fonts/*.otf`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS [otf to ttf]',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.fonter({
        formats: ['ttf'],
      }),
    )
    .pipe($.gulp.dest(`${$.path.srcFolder}/fonts`));
};

// Convert ttf fonts to woff & woff2 formats
export const ttfToWoff = () => {
  return $.gulp
    .src(`${$.path.srcFolder}/fonts/*.ttf`, {})
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS [ttf to woff]',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe(
      $.plugins.fonter({
        formats: ['woff'],
      }),
    )
    .pipe($.gulp.dest(`${$.path.srcFolder}/fonts`))
    .pipe($.gulp.src(`${$.path.srcFolder}/fonts/*.ttf`))
    .pipe($.plugins.ttf2woff2())
    .pipe($.gulp.dest(`${$.path.srcFolder}/fonts`));
};

// Creating a file with @font-face declarations
export const fStyle = async function () {
  let fontsFile = `${$.path.srcFolder}/base/scss/_fonts.scss`;

  $.plugins.fs.readdir(`${$.path.srcFolder}/fonts`, (err, fontsFiles) => {
    if (fontsFiles) {
      if (!$.plugins.fs.existsSync(fontsFile)) {
        $.plugins.fs.writeFile(fontsFile, '', cb); // eslint-disable-line
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          let fontFileName = fontsFiles[i].split('.')[0];
          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            let fontType = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
            let lowerFontType = fontType.toLowerCase();

            // Declaring variables for the font-weight and font-style properties
            let fontWeight;
            let fontStyle = 'normal';

            // Checking font-weight and font-style
            if (lowerFontType === 'thin') {
              fontWeight = 100;
            } else if (lowerFontType === 'thinitalic') {
              fontWeight = 100;
              fontStyle = 'italic';
            } else if (lowerFontType === 'extralight') {
              fontWeight = 200;
            } else if (lowerFontType === 'extralightitalic') {
              fontWeight = 200;
              fontStyle = 'italic';
            } else if (lowerFontType === 'light') {
              fontWeight = 300;
            } else if (lowerFontType === 'lightitalic') {
              fontWeight = 300;
              fontStyle = 'italic';
            } else if (lowerFontType === 'book') {
              fontWeight = 350;
            } else if (lowerFontType === 'bookitalic') {
              fontWeight = 350;
              fontStyle = 'italic';
            } else if (lowerFontType === 'retina') {
              fontWeight = 450;
            } else if (lowerFontType === 'retinaitalic') {
              fontWeight = 450;
              fontStyle = 'italic';
            } else if (lowerFontType === 'medium') {
              fontWeight = 500;
            } else if (lowerFontType === 'mediumitalic') {
              fontWeight = 500;
              fontStyle = 'italic';
            } else if (lowerFontType === 'semibold') {
              fontWeight = 600;
            } else if (lowerFontType === 'semibolditalic') {
              fontWeight = 600;
              fontStyle = 'italic';
            } else if (lowerFontType === 'bold') {
              fontWeight = 700;
            } else if (lowerFontType === 'bolditalic') {
              fontWeight = 700;
              fontStyle = 'italic';
            } else if (lowerFontType === 'extrabold' || lowerFontType === 'heavy') {
              fontWeight = 800;
            } else if (lowerFontType === 'extrabolditalic' || lowerFontType === 'heavyitalic') {
              fontWeight = 800;
              fontStyle = 'italic';
            } else if (lowerFontType === 'black') {
              fontWeight = 900;
            } else if (lowerFontType === 'blackitalic') {
              fontWeight = 900;
              fontStyle = 'italic';
            } else if (lowerFontType === 'regularitalic') {
              fontWeight = 400;
              fontStyle = 'italic';
            } else {
              fontWeight = 400;
            }

            /* eslint-disable */
            $.plugins.fs.appendFile(
              fontsFile,
              `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.ttf") format("ttf");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`,
              cb,
            );
            newFileOnly = fontFileName;
          } else {
            console.log(
              'The base/scss/fonts.scss already exists. To update a file, it must be deleted.',
            );
          }
          /* eslint-enable */
        }
      }
    }
  });

  function cb() {}
};

export const fonts = () => {
  return $.gulp
    .src($.path.src.fonts)
    .pipe(
      $.plugins.plumber(
        $.plugins.notify.onError({
          title: 'FONTS',
          message: 'Fix da mistake, leather man: <%= error.message %>',
        }),
      ),
    )
    .pipe($.gulp.dest($.path.build.fonts));
};
