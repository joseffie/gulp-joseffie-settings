// Bem-Create template for creating *.pug files

module.exports = (entity, naming) => [
  `mixin ${naming.stringify(entity)}()`,
  `  .${naming.stringify(entity)}&attributes(attributes)`,
  '',
].join('\n');
