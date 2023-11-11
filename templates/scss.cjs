// Bem-Create template for creating *.scss files

module.exports = (entity, naming) => [
  `.${naming.stringify(entity)} { }`,
  '',
].join('\n');
