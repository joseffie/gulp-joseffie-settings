// Bem-Create template for creating *.pug files

const { EOL } = require('os');

// eslint-disable-next-line func-names
module.exports = function (entity, naming) {
  return [
    `mixin ${naming.stringify(entity)}()`,
    `  .${naming.stringify(entity)}&attributes(attributes)`,
  ].join(EOL);
};
