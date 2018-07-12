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
    
    // Method to convert the ingredients(which is in one string) to an object of count,unit and ingredient 
    parseIngredients() {
        // Reapeated units can be replaced with new names
        const UnitsOld = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        //unitsNew - Shorter version of units
        const unitsNew = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsNew, 'kg', 'g'];

        // Create new ingredients bassed on the  data received from the server
        // map-loop through the ingredient array and in each iteration 
        // return parsed ingredient that will then be stored into the new ingredients array.
        const newIngredients = this.ingredients.map(el => {
            // 1) Uniform units
            let ingredient = el.toLowerCase();

            // For each element, replace unit with the new units(shorter version) 
            UnitsOld.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsNew[i]);
            });

            // 2) Remove parentheses if found
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3) Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(' ');

            // includes()- determines whether array includes a certain element 
            // for each current element,check if that element is inside of the units array.
            const unitIndex = arrIng.findIndex(el => units.includes(el));

            let objIngredients;
            if (unitIndex > -1) {
                // There is a unit
                // Ex. 5 1/2 cups, arrCount is [5, 1/2] --> eval("5+1/2") --> 5.5
                // Ex. 5 cups, arrCount is [5]
                const arrCount = arrIng.slice(0, unitIndex);
                
                let count;
                if (arrCount.length === 1) 
                    count = eval(arrIng[0].replace('-', '+'));
                else 
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                
                // Form the ingredient object with 3 variables
                objIngredients = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ')
                };
            } 
            // convert it to number
            else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but 1st element is number
                objIngredients = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                }
            } else if (unitIndex === -1) {
                // There is NO unit and NO number in 1st position
                objIngredients = {
                    count: 1, // default value if no count mentioned
                    unit: '',
                    ingredient //ES6 syntax. equivalent to ingredient:ingredient 
                }
            }
            return objIngredients;
        });
        this.ingredients = newIngredients;
    }
}