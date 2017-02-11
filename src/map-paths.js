import _ from 'lodash/fp';
// import {
//   filter,
//   first,
//   get,
//   has,
//   includes,
//   isObject,
//   keys,
//   map,
//   omitBy,
//   pipe,
//   reduce,
//   set,
//   split,
// } from 'lodash/fp';


const mapPaths = (pathMap, source) => {
  if (_.isArray(source)) {
    const handleSourceItem = s =>
      (_.isObject(s)
        ? mapObjectPaths(pathMap, s)
        : s);
    return _.map(handleSourceItem, source);
  }

  if (_.isObject(source)) {
    return mapObjectPaths(pathMap, source);
  }

  throw new Error('Source must be an object or array');
};

function mapObjectPaths(pathMap, source) {
  const withoutNesting = _.map(_.pipe(_.split('.'), _.first));
  const isUntouched = (value, key) => _.includes(key, withoutNesting(_.keys(pathMap)));

  return _.pipe(
    _.filter(path => _.has(path, source)),
    _.reduce((acc, path) =>
      _.set(pathMap[path], _.get(path, source), acc)
    , _.omitBy(isUntouched, source)),
  )(_.keys(pathMap));
}

export default mapPaths;
