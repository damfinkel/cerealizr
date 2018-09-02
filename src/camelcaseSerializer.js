const { Serializer } = require('./serializer');
const camelcase = require('lodash.camelcase');

class CamelcaseSerializer extends Serializer {
  constructor({ descriptor } = {}) {
    super({ descriptor, mapAllValues: true, defaultTransform: value => value });
  }

  getTransformedField(transform, key, value) {
    return { [camelcase(key)]: transform(value) };
  }
}

module.exports = CamelcaseSerializer;
