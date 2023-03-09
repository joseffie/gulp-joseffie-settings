// Bem-Create template for creating *.sass files

const { EOL } = require('os');

module.exports = (entity, naming) => [
  `.${naming.stringify(entity)}\n  `,
  '',
].join(EOL);
