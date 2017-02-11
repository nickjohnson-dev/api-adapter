import { filter, first, get, has, includes, keys, map, omitBy, pipe, reduce, set, split } from 'lodash/fp';

const withoutNesting = map(pipe(split('.'), first));

const mapPaths = (pathMap, source) => {
  const isUntouched = (_, key) => includes(key, withoutNesting(keys(pathMap)));

  return pipe(
    filter(path => has(path, source)),
    reduce((acc, path) =>
      set(pathMap[path], get(path, source), acc)
    , omitBy(isUntouched, source)),
  )(keys(pathMap));
};

export default mapPaths;
