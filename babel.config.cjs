module.exports = (api) => {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: {
          version: '3.8',
          proposals: true,
        },
      },
    ],
  ];

  const plugins = [
    [
      'transform-imports',
      {
        lodash: {
          // eslint-disable-next-line no-template-curly-in-string
          transform: 'lodash/${member}',
          preventFullImport: true,
        },
      },
    ],
    '@babel/plugin-proposal-export-default-from',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-function-sent',
  ];

  return {
    presets,
    plugins,
  };
};
