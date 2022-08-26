const sortMQ = require('sort-css-media-queries');

module.exports = () => ({
  plugins: {
    'postcss-flexbugs-fixes': {},
    autoprefixer: {
      flexbox: 'no-2009',
      cascade: true,
      grid: true,
    },
    'postcss-preset-env': {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    },
    'css-mqpacker': {
      sort: sortMQ,
    },
    'postcss-reporter': {},
  },
});
