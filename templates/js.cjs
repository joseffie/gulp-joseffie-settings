// Bem-Create template for creating *.js files

module.exports = (entity, naming) => {
  const pluginName = naming.stringify(entity).toLowerCase();
  const className = pluginName.charAt(0).toUpperCase() + pluginName.slice(1);

  return [
    'import Plugin from \'@core/Plugin.js\';',
    'import init from \'@core/init.js\';',
    '',
    `class ${className} extends Plugin {`,
    '  // constructor(element, options, name) {',
    '  //   super(element, options, name);',
    '  // }',
    '',
    '  init() { }',
    '',
    '  buildCache() { }',
    '',
    '  bindEvents() { }',
    '}',
    '',
    `export default init(${className}, '${pluginName}');`,
    '',
  ].join('\n');
};
