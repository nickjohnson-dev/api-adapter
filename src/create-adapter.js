import { get, includes, invert, isUndefined, keys, omitBy, set } from 'lodash/fp';

const createAdapter = keyMap => ({
  fromApi: apiObj => swapPaths(keyMap, apiObj),
  toApi: clientObj => swapPaths(invert(keyMap), clientObj),
});

function swapPaths(pathMap, source) {
  const mappedObj = keys(pathMap).reduce((acc, path) => {
    const value = get(path, source);

    if (isUndefined(value)) return acc;

    return set(pathMap[path], value, acc);
  }, {});

  const flatPaths = keys(pathMap).map(key =>
    (includes('.', key) ? key.split('.')[0] : key),
  );

  const leftovers = omitBy((value, key) => includes(key, flatPaths), source);

  return {
    ...mappedObj,
    ...leftovers,
  };
}

export default createAdapter;
