import CamelcaseSerializer from './camelcaseSerializer';

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

  describe('when object to serialize has nested objects', () => {
    const nestedObject = {
      some_key: 100,
      my_family: {
        my_father: 'John',
        my_mother: 'Johanna',
        my_daughters: { first_daughter: 'Carla', second_daughter: 'Myriam' }
      }
    };

    describe('when a the object has nested objects and no descriptor', () => {
      const serializer = new CamelcaseSerializer();

      it('maps all nested keys as camelcase', () => {
        expect(serializer.serialize(nestedObject)).toEqual({
          someKey: 100,
          myFamily: {
            myFather: 'John',
            myMother: 'Johanna',
            myDaughters: { firstDaughter: 'Carla', secondDaughter: 'Myriam' }
          }
        });
      });
    });
  });

  describe('when a the object to map is an array', () => {
    const array = [{ key_one: 'value_one' }, { key_two: 'value_two' }];
    const serializer = new CamelcaseSerializer({ descriptor: { key_two: v => `${v}_2` } });

    it('maps the array as camelcase in each element', () => {
      expect(serializer.serialize(array)).toEqual([{ keyOne: 'value_one' }, { keyTwo: 'value_two_2' }]);
    });
  });

  describe('when contains a date object', () => {
    const date = new Date();
    const object = { any_date: date };
    const serializer = new CamelcaseSerializer();

    it('returns date object as snake_case', () => {
      expect(serializer.serialize(object)).toEqual({
        anyDate: date
      });
    });
  });
});
