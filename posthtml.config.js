/* eslint-env node */

const { isProd } = require('./app.config.cjs');

module.exports = () => ({
  plugins: {
    /**
     * posthtml-attrs-sorter options
     * @see https://github.com/mrmlnc/posthtml-attrs-sorter/blob/master/README.md#options
     */
    'posthtml-attrs-sorter': isProd ? {
      order: [
        'class',
        'id',
        'name',
        'data-*',
        'src',
        'for',
        'type',
        'href',
        'value',
        'title',
        'alt',
        'role',
        'aria-*',
        'tabindex',
        'style',
      ],
    } : false,

    /**
   * htmlnano options
   * @see https://htmlnano.netlify.app/modules
   */
    htmlnano: isProd ? {
      collapseAttributeWhitespace: true,
      collapseWhitespace: false,
      deduplicateAttributeValues: true,
      removeComments: false,
      removeEmptyAttributes: false,
      removeAttributeQuotes: false,
      removeUnusedCss: false,
      minifyCss: false,
      minifyJs: false,
      minifyJson: false,
      minifySvg: false,
      minifyConditionalComments: false,
      removeRedundantAttributes: true,
      collapseBooleanAttributes: true,
      mergeStyles: true,
      mergeScripts: false,
      sortAttributesWithLists: false,
      sortAttributes: false,
      minifyUrls: false,
      removeOptionalTags: false,
      normalizeAttributeValues: true,
    } : false,
  },
});
