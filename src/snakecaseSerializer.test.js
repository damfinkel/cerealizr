const SnakecaseSerializer = require('./snakecaseSerializer');

describe('SnakecaseSerializer', () => {
  const someObject = {
    id: 1,
    firstName: 'John',
    country_id: 200,
    nickNames: ['johnny', 'dude']
  };

  describe('when no descriptor is passed', () => {
    const serializer = new SnakecaseSerializer();

    it('returns all the keys transformed to camelcase', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        first_name: 'John',
        country_id: 200,
        nick_names: ['johnny', 'dude']
      });
    });
  });

  describe('when a descriptor is passed', () => {
    const descriptor = {
      firstName: 'name',
      nickNames: value => value.map(nick => nick.toUpperCase())
    };

    const serializer = new SnakecaseSerializer({ descriptor });

    it('returns the descriptor keys with the mapped values and the others as camelcase', () => {
      expect(serializer.serialize(someObject)).toEqual({
        id: 1,
        name: 'John',
        country_id: 200,
        nick_names: ['JOHNNY', 'DUDE']
      });
    });
  });
});
