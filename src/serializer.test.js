const { Serializer, SerializerError } = require('./serializer');

describe('Serializer', () => {
  const someObject = {
    id: 1,
    first_name: 'John',
    country_id: 200,
    nicknames: ['johny', 'dude']
  };

  describe('When serializer mapper is valid', () => {
    const mapper = {
      id: 'id',
      first_name: 'firstName',
      nicknames: 'nicknames',
      country_id: (key, value) => ({ [`${key}_number`]: value + 100 })
    };

    const serializer = new Serializer(mapper);

    it('maps string keys equal to the original correctly', () => {
      expect(serializer.serialize(someObject).id).toBe(1);
    });

    it('maps string keys different to the original correctly', () => {
      expect(serializer.serialize(someObject).firstName).toBe('John');
    });

    it('maps with a function both value and key', () => {
      expect(serializer.serialize(someObject).country_id_number).toBe(300);
    });

    it('has exactly the keys defined in the mapper', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        firstName: 'John',
        nicknames: ['johny', 'dude'],
        country_id_number: 300
      });
    });
  });

  describe('when Serializer mapper value is not a string or a function', () => {
    const mapper = {
      id: 999
    };

    const serializer = new Serializer(mapper);

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns null', () => {
    const mapper = {
      id: () => null
    };

    const serializer = new Serializer(mapper);

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns a value that is not an object', () => {
    const mapper = {
      id: () => 10
    };

    const serializer = new Serializer(mapper);

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });

  describe('when Serializer mapper value is a function that returns a value that has more than one key', () => {
    const mapper = {
      id: () => ({ key1: 10, key2: 20 })
    };

    const serializer = new Serializer(mapper);

    it('throws a SerializerError', () => {
      expect(() => serializer.serialize(someObject)).toThrow(SerializerError);
    });
  });
});
