import test from 'ava';
import createAdapter from './create-adapter';

test('fromApi should handle deep object', (t) => {
  const keyMap = {
    digits: 'phone.number',
    phonePrefix: 'phone.areaCode',
    knownBy: 'name',
    'residenceIdentifier.road': 'address.street',
    'residenceIdentifier.postalCode': 'address.zip',
  };
  const adapter = createAdapter(keyMap);
  const user = {
    digits: '555-1234',
    knownBy: 'Nick',
    phonePrefix: '123',
    residenceIdentifier: {
      road: 'Main Street',
      postalCode: 90210,
    },
    untouched: true,
  };
  const expected = {
    address: {
      street: 'Main Street',
      zip: 90210,
    },
    name: 'Nick',
    phone: {
      areaCode: '123',
      number: '555-1234',
    },
    untouched: true,
  };
  const result = adapter.fromApi(user);
  t.deepEqual(result, expected);
});

test('toApi should handle deep object', (t) => {
  const keyMap = {
    digits: 'phone.number',
    phonePrefix: 'phone.areaCode',
    knownBy: 'name',
    'residenceIdentifier.road': 'address.street',
    'residenceIdentifier.postalCode': 'address.zip',
  };
  const adapter = createAdapter(keyMap);
  const user = {
    address: {
      street: 'Main Street',
      zip: 90210,
    },
    name: 'Nick',
    phone: {
      areaCode: '123',
      number: '555-1234',
    },
    untouched: true,
  };
  const expected = {
    digits: '555-1234',
    knownBy: 'Nick',
    phonePrefix: '123',
    residenceIdentifier: {
      road: 'Main Street',
      postalCode: 90210,
    },
    untouched: true,
  };
  const result = adapter.toApi(user);
  t.deepEqual(result, expected);
});

test.todo('should carry through properties that do not exist on keyMap');
test.todo('fromApi single level');
test.todo('toApi');

// eslint-disable-next-line
// test.todo('toApi should return input object with keys renamed from client keys to api keys', (t) => {
//   const keyMap = {
//     first: 'ichiban',
//     second: 'niban',
//     third: 'sanban',
//     fourth: 'shiban',
//   };
//   const adapter = createAdapter(keyMap);
//   const favoriteRamen = {
//     ichiban: 'Tonkotsu',
//     niban: 'Miso',
//     sanban: 'Shio',
//     shiban: 'Shoyu',
//   };
//   const expected = {
//     first: 'Tonkotsu',
//     second: 'Miso',
//     third: 'Shio',
//     fourth: 'Shoyu',
//   };
//   const result = adapter.toApi(favoriteRamen);
//   t.deepEqual(result, expected);
// });
