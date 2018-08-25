const toCamelcase = require('lodash.camelcase');

module.exports.setValue = value => key => ({ [key]: value });

module.exports.setCamelcaseKey = (transformValue = value => value) => (key, value) => ({
  [toCamelcase(key)]: transformValue(value)
});
