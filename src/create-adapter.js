import { invert } from 'lodash/fp';
import swapPaths from './swap-paths';

const createAdapter = pathMap => ({
  fromApi(apiObj) {
    return this.swapPaths(pathMap, apiObj);
  },

  swapPaths,

  toApi(clientObj) {
    return this.swapPaths(invert(pathMap), clientObj);
  },
});

export default createAdapter;
