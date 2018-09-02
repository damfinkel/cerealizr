const CamelcaseSerializer = require('./camelcaseSerializer');

describe('CamelcaseSerializer', () => {
  const someObject = {
    id: 1,
    first_name: 'John',
    country_id: 200,
    nickNames: ['johnny', 'dude']
  };

  describe('when no descriptor is passed', () => {
    const serializer = new CamelcaseSerializer();

    it('returns all the keys transformed to camelcase', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        firstName: 'John',
        countryId: 200,
        nickNames: ['johnny', 'dude']
      });
    });
  });

  describe('when a descriptor is passed', () => {
    const descriptor = {
      first_name: 'name',
      nickNames: value => value.map(nick => nick.toUpperCase())
    };

    const serializer = new CamelcaseSerializer({ descriptor });

    it('returns the descriptor keys with the mapped values and the others as camelcase', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        name: 'John',
        countryId: 200,
        nickNames: ['JOHNNY', 'DUDE']
      });
    });
  });
});
