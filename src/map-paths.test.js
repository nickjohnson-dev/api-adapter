import test from 'ava';
import mapPaths from './map-paths';

test('should move values from key paths to value paths using given path map as reference', (t) => {
  const pathMap = {
    band: 'artist',
    track: 'title',
  };
  const original = {
    band: 'Bill Evans',
    track: 'Blue in Green',
  };
  const expected = {
    artist: 'Bill Evans',
    title: 'Blue in Green',
  };
  const result = mapPaths(pathMap, original);
  t.deepEqual(result, expected);
});

test('should handle converting to nested values', (t) => {
  const pathMap = {
    band: 'staff.artist',
    track: 'title',
  };
  const original = {
    band: 'Bill Evans',
    track: 'Blue in Green',
  };
  const expected = {
    staff: {
      artist: 'Bill Evans',
    },
    title: 'Blue in Green',
  };
  const result = mapPaths(pathMap, original);
  t.deepEqual(result, expected);
});

test('should handle converting from nested values', (t) => {
  const pathMap = {
    'other.band': 'artist',
    track: 'title',
  };
  const original = {
    other: {
      band: 'Bill Evans',
    },
    track: 'Blue in Green',
  };
  const expected = {
    artist: 'Bill Evans',
    title: 'Blue in Green',
  };
  const result = mapPaths(pathMap, original);
  t.deepEqual(result, expected);
});

test('should retain values not included in path map when converting', (t) => {
  const pathMap = {
    band: 'artist',
    track: 'title',
  };
  const original = {
    band: 'Bill Evans',
    stars: 5,
    track: 'Blue in Green',
  };
  const expected = {
    artist: 'Bill Evans',
    stars: 5,
    title: 'Blue in Green',
  };
  const result = mapPaths(pathMap, original);
  t.deepEqual(result, expected);
});

test.todo('handle array');
test.todo('handle json string');
