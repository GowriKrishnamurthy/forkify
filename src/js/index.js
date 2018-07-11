// Global app controller
import Search from './models/Search';

global._babelPolyfill = false;

const searchObj= new Search('pizza');
searchObj.getResults();