# Fonts

This is the folder with the source font files. To get started, move all your fonts to this folder and run the `npm run fonts` script in the console. After successful compilation, new font formats more relevant for browsers will appear in this folder, as well as the `_fonts.scss` file in the `src/base/scss/` directory. To make it work, you just have to uncomment the 5th line of code in the `main.scss` file (src/base/scss/).

```scss
@import '../../mixins/mixins';

@import './_variables';

// @import './_fonts'; # This line should be uncommented

// @import './print';

@import '../../components/components';
```
