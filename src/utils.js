const toCamelcase = require('lodash.camelcase');
const toSnakecase = require('lodash.snakecase');

// Private functions

const isArray = value => value.constructor === Array;

module.exports.isArray = isArray;

module.exports.isNonArrayObject = value => typeof value === 'object' && !isArray(value);

// Public functions

module.exports.setValue = value => key => ({ [key]: value });

module.exports.setCamelcaseKey = (transformValue = value => value) => (key, value) => ({
  [toCamelcase(key)]: transformValue(value)
});

module.exports.setSnakecaseKey = (transformValue = value => value) => (key, value) => ({
  [toSnakecase(key)]: transformValue(value)
});
