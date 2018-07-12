import { elements } from './base';

// Get input field entered on the UI for filtering the recipes 
export const getInput = () => elements.searchInput.value;

// Clear the input field
export const clearInput = () => elements.searchInput.value = '';

// Clear the results page
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

/* Testing - limitRecipeTitle function with sample data
// 'Pasta with tomato and spinach'
acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato', 'and']
acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato', 'and']
*/
// Method to format the title to show limited char -> so that its displayed one line on our page
export const limitRecipeTitle = (title, limit = 10) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

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
                <h4 class="results__name">${limitRecipeTitle(recipe.title, 15)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`;
    // Render the markup on the UI
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

// Method to create prev and buttons
// buttonType: 'prev' or 'next'. page: number to display on the button  

    /* Button caption : page num
    1. Imagine we have a previous button and we're on page number two.
    we want to display that we want to go to page number one.  -1
    2.  if we have a next button, button should display page number three. +1

    Button Icon: 
    Prev - arrow pointing to the left side
    Next - arrow pointing to the right side
    //HTML5 data attribute-(data-<randomname>):specify the number of page we want to go to
    */
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;

const renderButtons = (currentPageNum, resultPerPage, resultCount) => {

    // Find out how many pages
    const totalPages = Math.ceil(resultCount / resultPerPage);

    //If there is only one page of results , render no pagination buttons
    if (totalPages === 1) {
        return;
    }
    // create Button element based on the pagination deails
    let buttonEl;
    if (currentPageNum === 1) {
        // User currently on the First page and tehre are more pages to go - Show only one button: to go to next page 
        buttonEl = createButton(currentPageNum, 'next');
    }
    else if (currentPageNum === totalPages) { 
        // Last page - Show only one button: to go to previous page 
        buttonEl = createButton(currentPageNum, 'prev');
    }
    else {
        // somewhere in the middle - show 2 buttons. Prev and Next
        buttonEl = `
        ${createButton(currentPageNum, 'prev')}
        ${createButton(currentPageNum, 'next')}
    `;
    }
          
    // Display the button on the UI
    elements.searchResPages.insertAdjacentHTML('afterbegin', buttonEl);
}

// Printing the recipe list received from the server to the UI
export const renderResults = (recipes, currentPageNum = 1, resultPerPage = 10) => {
    // If no recipes found, show the error message.
    if (recipes.length == 0) {
        // Render the markup on the UI
        elements.searchResList.innerHTML = '<a class="results__name"> No recipe found! </a>';
    }
    else {
        // Caculate start and end record poninter based on the input page numbers
        const start = (currentPageNum - 1) * resultPerPage; // array index - zero basedd
        const end = currentPageNum * resultPerPage;

        // Slice array to pick elements from start to end and process rendering for those records only
        // For each recipe, form HTML markup to show on Ui
        recipes.slice(start, end).forEach(renderRecipe);

        // render pagination buttons on the page
        renderButtons(currentPageNum,resultPerPage,recipes.length);
    }
}