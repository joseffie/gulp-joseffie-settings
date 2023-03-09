// Bem-Create template for creating *.scss files

const { EOL } = require('os');

module.exports = (entity, naming) => [
  `.${naming.stringify(entity)} {\n  `,
  '}\n',
].join(EOL);
