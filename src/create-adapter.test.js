import test from 'ava';
import createAdapter from './create-adapter';

test('createAdapter should return object containing input property map', (t) => {
  const propertyMap = {
    a: 'b',
  };
  const result = createAdapter(propertyMap);
  t.deepEqual(result.propertyMap, propertyMap);
});
