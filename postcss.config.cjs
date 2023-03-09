const { isProd, sortingMediaQueriesMode } = require('./app.config.cjs');

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
    'postcss-sort-media-queries': {
      sort: sortingMediaQueriesMode || 'desktop-first',
    },
    'postcss-reporter': {},
  },
});
