// Bem-Create template for creating *.pug files

const { EOL } = require('os');

// eslint-disable-next-line func-names
module.exports = function (entity, naming) {
  return [
    'include ../container/container.pug',
    '',
    `mixin ${naming.stringify(entity)}()`,
    `\t.${naming.stringify(entity)}&attributes(attributes)`,
    '\t\t+container()',
  ].join(EOL);
};
