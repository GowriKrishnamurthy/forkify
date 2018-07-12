//Recipe model
import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    // Get recipe based on the recipeID passed in as param to the constru
    async getRecipe() {
        try {
            const recipeDetail = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = recipeDetail.data.recipe.title;
            this.author = recipeDetail.data.recipe.publisher;
            this.img = recipeDetail.data.recipe.image_url;
            this.url = recipeDetail.data.recipe.source_url;
            this.ingredients = recipeDetail.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
    
    // Rough calculation of cooking time bassed on the ingredients recieved from the server.
    calculateCookingTime() {
        // Assumption: 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        // Assumption - 4 servings for each of the recipe
        this.servings = 4;
    }
}