// Example usage:
// const myObject = {
//  some_key: 4,
//  key_two: "example text"
// }
// const mapper = {
//   some_key: 'someOtherKey',
//   key_two: (key, value) => ({ `${key_two}_2`: value + value })
// };
//
// const serializer = new Serializer(mapper);
// serializer.map(myObject);

class SerializerError extends Error {}

class Serializer {
  constructor(descriptor) {
    this.descriptor = descriptor;
  }

  transformWithFunction(object, newField) {
    return { ...object, ...newField };
  }

  transformWithString(object, string, value) {
    object[string] = value;
  }

  serialize(object) {
    return Object.keys(this.descriptor).reduce((accumulator, key) => {
      const value = object[key];
      const transform = this.descriptor[key];

      if (typeof transform === 'function') {
        const newField = transform(key, value);
        if (newField === null || typeof newField !== 'object' || Object.keys(newField).length > 1) {
          throw new SerializerError(
            'Serializer mapper funciton values must return an non null object with only one key'
          );
        }
        return this.transformWithFunction(accumulator, newField);
      } else if (typeof transform === 'string') {
        this.transformWithString(accumulator, transform, value);
      } else {
        throw new SerializerError('Serializer mapper values must be either a string or a function');
      }

      return accumulator;
    }, {});
  }
}

module.exports.Serializer = Serializer;
module.exports.SerializerError = SerializerError;
