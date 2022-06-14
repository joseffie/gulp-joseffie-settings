# Fonts
This is the folder with the source font files. To get started, move all your fonts to this folder and run the `npm run fonts` script in the console. After successful compilation, new font formats more relevant for browsers will appear in this folder, as well as the `_fonts.scss` file in the `src/base/scss/` directory. To make it work, you just have to uncomment the 11th line of code in the `main.scss` file (src/base/scss/).

```scss
// Mixins
@import '../../mixins/scss/_media.scss';
@import '../../mixins/scss/adaptive.scss';
@import '../../mixins/scss/general.scss';
@import '../../mixins/scss/text.scss';

// Base
@import './_settings';
@import './_variables';
// Comment out if you don't have local fonts or didn't compile them with "npm run fonts" command
// @import './fonts'; # this line needs to be uncommented

// Components
@import '../../components/components.scss';

// Import vendor styles
@import '../../vendor/normalize.scss';
```
