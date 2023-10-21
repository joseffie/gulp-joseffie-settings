// Bem-Create template for creating *.js files

const { EOL } = require('os');

module.exports = (entity, naming) => {
  const fileName = naming.stringify(entity);
  const className = fileName.charAt(0).toUpperCase() + fileName.slice(1);

  return [
    'import Plugin from \'@core/Plugin.js\';',
    'import init from \'@core/init.js\';',
    '',
    `class ${className} extends Plugin {`,
    '  constructor(element, options, name) {',
    '    super(element, options, name);',
    '',
    '    if (!this.isInited()) {',
    '      this._init();',
    '    }',
    '  }',
    '}',
    '',
    `export default init(${className}, '${fileName}');`,
  ].join(EOL);
};
