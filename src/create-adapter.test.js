import test from 'ava';
import sinon from 'sinon';
import mapPaths from './map-paths';
import createAdapter from './create-adapter';

test('should return object with mapPaths method equal to mapPaths function', (t) => {
  const adapter = createAdapter({});
  t.is(adapter.mapPaths, mapPaths);
});

test('should return object with fromApi method that invokes mapPaths with given path map', (t) => {
  const pathMap = { title: 'name' };
  const adapter = createAdapter(pathMap);
  adapter.mapPaths = sinon.spy();
  const source = { title: 'Blue in Green' };
  adapter.fromApi(source);
  t.deepEqual(adapter.mapPaths.lastCall.args, [pathMap, source]);
});

test('should return object with fromApi method that returns the return value of mapPaths', (t) => {
  const adapter = createAdapter({});
  const mappedObject = { key: 'value' };
  adapter.mapPaths = () => mappedObject;
  const result = adapter.fromApi({});
  t.deepEqual(result, mappedObject);
});

test('should return object with toApi method that invokes mapPaths with inverted version ofgiven path map', (t) => {
  const pathMap = { title: 'name' };
  const invertedPathMap = { name: 'title' };
  const adapter = createAdapter(pathMap);
  adapter.mapPaths = sinon.spy();
  const source = { title: 'Blue in Green' };
  adapter.toApi(source);
  t.deepEqual(adapter.mapPaths.lastCall.args, [invertedPathMap, source]);
});

test('should return object with toApi method that returns the return value of mapPaths', (t) => {
  const adapter = createAdapter({});
  const mappedObject = { key: 'value' };
  adapter.mapPaths = () => mappedObject;
  const result = adapter.toApi({});
  t.deepEqual(result, mappedObject);
});
