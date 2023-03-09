// Bem-Create template for creating *.pug files

const { EOL } = require('os');

module.exports = (entity, naming) => [
  `mixin ${naming.stringify(entity)}()`,
  `  .${naming.stringify(entity)}&attributes(attributes)`,
].join(EOL);
