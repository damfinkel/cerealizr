const KeySerializer = require('./keySerializer');
const camelcase = require('lodash.camelcase');

class CamelcaseSerializer extends KeySerializer {
  constructor({ descriptor } = {}) {
    super({ descriptor, keyTransform: camelcase });
  }
}

module.exports = CamelcaseSerializer;
