const Serializer = require('./serializer');

class KeySerializer extends Serializer {
  constructor({ descriptor, keyTransform = key => key } = { descriptor: null, keyTransform: key => key }) {
    super({ descriptor, mapAllValues: true, defaultTransform: value => value });
    this.keyTransform = keyTransform;
  }

  getTransformedField(transform, key, value) {
    if (typeof value === 'object' && value.constructor !== Array) {
      return { [this.keyTransform(key)]: this.serialize(value) };
    }
    return { [this.keyTransform(key)]: transform(value) };
  }
}

module.exports = KeySerializer;
