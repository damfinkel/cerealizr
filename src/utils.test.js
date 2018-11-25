const { setValue, setCamelcaseKey, setObjectDescriptor } = require('./utils');
const Serializer = require('./serializer');
const SerializerError = require('./serializerError');

describe('setValue', () => {
  const someObject = {
    id: 1
  };

  const descriptor = {
    id: setValue({ someKey: 100, someOtherKey: 'aString' })
  };

  const serializer = new Serializer({ descriptor });

  it('sets a hardcoded value as the id', () => {
    expect(serializer.serialize(someObject).id).toEqual({ someKey: 100, someOtherKey: 'aString' });
  });
});

describe('setCamelcaseKey', () => {
  const someObject = {
    snake_case_key: 1,
    other_key: 'other value'
  };

  const descriptor = {
    snake_case_key: setCamelcaseKey(value => value + 100)
  };

  const serializer = new Serializer({ descriptor });

  it('transform key to camelcase and transforms the value with the given function', () => {
    expect(serializer.serialize(someObject).snakeCaseKey).toBe(101);
  });
});

describe('setObjectDescriptor', () => {
  const someObject = {
    snake_case_key: 1,
    other_key: 'other value',
    object_to_map: { property_one: 'one', property_two: { two_first: '2.1', two_second: '2.2' } }
  };

  it('transforms the key with the first parameter and the object as second parameter if it is an object', () => {
    const descriptor = {
      snake_case_key: 'camelCaseKey',
      object_to_map: setObjectDescriptor('objectToMap', {
        property_one: 'propertyOne',
        property_two: setObjectDescriptor('propertyTwo', { two_second: 'twoSecondKey' })
      })
    };

    const serializer = new Serializer({ descriptor });

    expect(serializer.serialize(someObject)).toEqual({
      camelCaseKey: 1,
      objectToMap: { propertyOne: 'one', propertyTwo: { twoSecondKey: '2.2' } }
    });
  });

  it('throws an exception when the key does not contain an object', () => {
    const descriptor = {
      snake_case_key: setObjectDescriptor('objectToMap', {
        property_one: 'propertyOne',
        property_two: setObjectDescriptor('propertyTwo', { two_second: 'twoSecondKey' })
      })
    };

    const serializer = new Serializer({ descriptor });

    expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
  });
});
