import axios from 'axios';
import { key, proxy } from '../config';

export default class Search {
    // Seach class has 2 members: query and result
    constructor(query) {
        this.query = query;
    }
    // Making API calls to food2fork.com 
    async getResults() {
        // CORS - This API enables cross-origin requests to anywhere.
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result= res.data.recipes;
        }
        catch (error) {
            alert(error);
        }
    }
}
