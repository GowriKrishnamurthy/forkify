// Global app controller
import axios from 'axios';

global._babelPolyfill = false;

// Making API calls to food2fork.com 
async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = 'd9116bf99e3acef6866daf871a8cd0a6';

    try {
        const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes);
    }
    catch (error) {
        alert(error);
    }
}
getResults('pizza');