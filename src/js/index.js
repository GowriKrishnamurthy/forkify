// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

global._babelPolyfill = false;

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/** 
 * SEARCH CONTROLLER
 */
// Call back function 
const controlSearch = async () => {
    // 1. Get the query from view
    const query = searchView.getInput();

    if (query) {
        // 2) New search object and add to search member of state variable.
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        searchView.renderResults(state.search.result);
    }
};

// Add a listener to the search command button 
document.querySelector('.search').addEventListener('submit', el => {
    // Prevent the default action like page reload,etc
    el.preventDefault();
    controlSearch();
});