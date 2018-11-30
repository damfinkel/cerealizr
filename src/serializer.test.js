const Serializer = require('./serializer');
const SerializerError = require('./serializerError');

describe('Serializer', () => {
  const someObject = {
    id: 1,
    first_name: 'John',
    country_id: 200,
    nicknames: ['johny', 'dude'],
    unmapped_key: 'no mapping'
  };

  describe('When serializer mapper is valid', () => {
    const descriptor = {
      id: 'id',
      first_name: 'firstName',
      nicknames: 'nicknames',
      country_id: (key, value) => ({ [`${key}_number`]: value + 100 })
    };

    const serializer = new Serializer({ descriptor });

    it('has exactly the keys defined in the mapper', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        firstName: 'John',
        nicknames: ['johny', 'dude'],
        country_id_number: 300
      });
    });
  });

  describe('when mapAllValues is true and has no default transform', () => {
    const descriptor = {
      id: 'id',
      first_name: 'firstName',
      nicknames: 'nicknames',
      country_id: (key, value) => ({ [`${key}_number`]: value + 100 })
    };

    const serializer = new Serializer({ descriptor, mapAllValues: true });

    it('maps the keys defined in the descriptor and returns the others with no changes', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        firstName: 'John',
        nicknames: ['johny', 'dude'],
        country_id_number: 300,
        unmapped_key: 'no mapping'
      });
    });

    describe('when mapAllValues is true and has a default transform', () => {
      const descriptor = {
        id: 'id',
        first_name: 'firstName',
        nicknames: 'nicknames',
        country_id: (key, value) => ({ [`${key}_number`]: value + 100 })
      };

      const serializer = new Serializer({
        descriptor,
        mapAllValues: true,
        defaultTransform: (key, value) => ({ [key.toUpperCase()]: value.toUpperCase() })
      });

      it('maps the keys defined in the descriptor and returns the others with the default transform applied', () => {
        expect(serializer.serialize(someObject)).toEqual({
          id: 1,
          firstName: 'John',
          nicknames: ['johny', 'dude'],
          country_id_number: 300,
          UNMAPPED_KEY: 'NO MAPPING'
        });
      });
    });
  });

  describe('when Serializer mapper value is not a string or a function', () => {
    const descriptor = {
      id: 999
    };

    const serializer = new Serializer({ descriptor });

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns null', () => {
    const descriptor = {
      id: () => null
    };

    const serializer = new Serializer({ descriptor });

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns a value that is not an object', () => {
    const descriptor = {
      id: () => 10
    };

    const serializer = new Serializer({ descriptor });

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns a value that has more than one key', () => {
    const descriptor = {
      id: () => ({ key1: 10, key2: 20 })
    };

    const serializer = new Serializer({ descriptor });

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when value to be serialized is not an object', () => {
    const value = 10;

    const descriptor = {
      id: () => ({ key1: 10, key2: 20 })
    };

    const serializer = new Serializer({ descriptor });

    it('throws a SerializerError', () => {
      expect(serializer.serialize(value)).toEqual(10);
    });
  });

  describe('when value to be serialized is an array of objects', () => {
    const someArray = [
      { prop1: 'value1' },
      { prop1: 'value2', prop2: { key1: 'value1', key2: 'value2' } },
      { prop3: [1, 2, 3] }
    ];

    const descriptor = {
      prop1: 'propOne',
      prop2: (_, value) => ({ propTwo: value })
    };

    const serializer = new Serializer({ descriptor, mapAllValues: true });

    it('maps the array using the descriptor in each element', () => {
      expect(serializer.serialize(someArray)).toEqual([
        { propOne: 'value1' },
        { propOne: 'value2', propTwo: { key1: 'value1', key2: 'value2' } },
        { prop3: [1, 2, 3] }
      ]);
    });
  });

  describe('when value to be serialized is an array of array of objects', () => {
    const someArray = [[{ prop1: 'value1' }, { prop2: 'value2' }]];

    const descriptor = {
      prop1: 'propOne',
      prop2: (_, value) => ({ propTwo: value })
    };

    const serializer = new Serializer({ descriptor, mapAllValues: true });

    it('maps the array using the descriptor in each element', () => {
      expect(serializer.serialize(someArray)).toEqual([[{ propOne: 'value1' }, { propTwo: 'value2' }]]);
    });
  });
});
