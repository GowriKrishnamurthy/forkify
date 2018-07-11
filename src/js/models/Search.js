
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // Making API calls to food2fork.com 
    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'd9116bf99e3acef6866daf871a8cd0a6';

        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result= res.data.recipes;
            console.log(this.result);
        }
        catch (error) {
            alert(error);
        }
    }
}
