const { importSchema } = require("graphql-import");

module.exports = (source) => {
  this.value = source;
  return `module.exports = \`${importSchema(source)}\``;
};