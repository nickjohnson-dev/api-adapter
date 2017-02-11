import { invert } from 'lodash/fp';
import mapPaths from './map-paths';

const createAdapter = pathMap => ({
  fromApi(apiObj) {
    return this.mapPaths(pathMap, apiObj);
  },

  mapPaths,

  toApi(clientObj) {
    return this.mapPaths(invert(pathMap), clientObj);
  },
});

export default createAdapter;
