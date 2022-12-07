const isProd = process.argv.includes('--production');
const sortMQ = require('sort-css-media-queries');

module.exports = () => ({
  plugins: {
    'postcss-flexbugs-fixes': isProd ? {} : false,
    autoprefixer: isProd ? {
      flexbox: 'no-2009',
      cascade: true,
      grid: true,
    } : false,
    'postcss-preset-env': isProd ? {} : false,
    cssnano: isProd ? {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    } : false,
    'css-mqpacker': {
      sort: sortMQ,
    },
    'postcss-reporter': {},
  },
});
