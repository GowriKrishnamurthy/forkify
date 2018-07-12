// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderSpinnerLoader, clearSpinnerLoader } from './views/base';

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

        // searchRes: DOM element-div for showing results
        // Attach renderSpinnerLoader to this searchRes element
        renderSpinnerLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            // Remove animated spinner loader 
            clearSpinnerLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search...');
            clearSpinnerLoader();
        }

    }
};

// Add a listener to the search command button 
elements.searchForm.addEventListener('submit', el => {
    // Prevent the default action like page reload,etc
    el.preventDefault();
    controlSearch();
});

// Add click event listeners to the pagination buttons
elements.searchResPages.addEventListener('click', el => {
    // target - To find out exactly where click had happened
    // elements.closest - returns to closest ancestor of the current element 
    // which matches the selector given in the parameter.
    // btn-inline - button class used while creating pagination buttons in SearchView

    const btn = el.target.closest('.btn-inline');
    if (btn) {
        // Get the goto page data attribute value
        const goToPage = parseInt(btn.dataset.goto, 10); //10 - base of the num
        searchView.clearResults();

        // Render results with the new page num on UI
        searchView.renderResults(state.search.result, goToPage);
    }
});