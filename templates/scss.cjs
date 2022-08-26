// Bem-Create template for creating *.scss files

const { EOL } = require('os');

// eslint-disable-next-line func-names
module.exports = function (entity, naming) {
  return [`.${naming.stringify(entity)} {\n  `, '}\n'].join(EOL);
};
