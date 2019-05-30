import Serializer from './serializer';

class KeySerializer extends Serializer {
  constructor({ descriptor, keyTransform = key => key } = { descriptor: null, keyTransform: key => key }) {
    super({ descriptor, mapAllValues: true, defaultTransform: value => value });
    this.keyTransform = keyTransform;
  }

  getTransformedField(transform, key, value) {
    if (value && typeof value === 'object' && !(value instanceof Date)) {
      return { [this.keyTransform(key)]: this.serialize(transform(value)) };
    }
    return { [this.keyTransform(key)]: transform(value) };
  }
}

export default KeySerializer;
