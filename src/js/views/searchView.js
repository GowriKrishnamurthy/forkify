import { elements } from './base';

// Get input field entered on the UI for filtering the recipes 
export const getInput = () => elements.searchInput.value;

// Clear the input field
export const clearInput = () => elements.searchInput.value = '';

// Clear the results page
export const clearResults = () => elements.searchResList.innerHTML = '';

// Load the recipes on to the UI
const renderRecipe = recipe => {
    // Form the HTML markup with all the received values
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`;
    // Render the markup on the UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Printing the recipe list received from the server to the UI
export const renderResults = recipes => {
    // If no recipes found, show the error message.
    if (recipes.length == 0) {
        // Render the markup on the UI
        elements.searchResList.innerHTML = '<a class="results__name"> No recipe found! </a>';
    }
    else {
        //For each recipe, form HTML markup to show on Ui
        recipes.forEach(renderRecipe);
    }
}