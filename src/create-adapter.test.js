import test from 'ava';
import sinon from 'sinon';
import createAdapter from './create-adapter';
import swapPaths from './swap-paths';

test('should return object with swapPaths method equal to swapPaths function', (t) => {
  const adapter = createAdapter({});
  t.is(adapter.swapPaths, swapPaths);
});

test('should return object with fromApi method that invokes swapPaths with given path map', (t) => {
  const pathMap = { title: 'name' };
  const adapter = createAdapter(pathMap);
  adapter.swapPaths = sinon.spy();
  const source = { title: 'Blue in Green' };
  adapter.fromApi(source);
  t.deepEqual(adapter.swapPaths.lastCall.args, [pathMap, source]);
});

test('should return object with fromApi method that returns the return value of swapPaths', (t) => {
  const adapter = createAdapter({});
  const swappedObject = { key: 'value' };
  adapter.swapPaths = () => swappedObject;
  const result = adapter.fromApi({});
  t.deepEqual(result, swappedObject);
});

test('should return object with toApi method that invokes swapPaths with inverted version ofgiven path map', (t) => {
  const pathMap = { title: 'name' };
  const invertedPathMap = { name: 'title' };
  const adapter = createAdapter(pathMap);
  adapter.swapPaths = sinon.spy();
  const source = { title: 'Blue in Green' };
  adapter.toApi(source);
  t.deepEqual(adapter.swapPaths.lastCall.args, [invertedPathMap, source]);
});

test('should return object with toApi method that returns the return value of swapPaths', (t) => {
  const adapter = createAdapter({});
  const swappedObject = { key: 'value' };
  adapter.swapPaths = () => swappedObject;
  const result = adapter.toApi({});
  t.deepEqual(result, swappedObject);
});
