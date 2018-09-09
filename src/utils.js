const toCamelcase = require('lodash.camelcase');
const toSnakecase = require('lodash.snakecase');

module.exports.setValue = value => key => ({ [key]: value });

module.exports.setCamelcaseKey = (transformValue = value => value) => (key, value) => ({
  [toCamelcase(key)]: transformValue(value)
});

module.exports.setSnakecaseKey = (transformValue = value => value) => (key, value) => ({
  [toSnakecase(key)]: transformValue(value)
});
