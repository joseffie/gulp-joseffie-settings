// Bem-Create template for creating *.sass files

module.exports = (entity, naming) => [
  `.${naming.stringify(entity)}`,
  '',
].join('\n');
