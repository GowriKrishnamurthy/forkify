import axios from 'axios';

export default class Search {
    // Seach class has 2 members: query and result
    constructor(query) {
        this.query = query;
    }
    // Making API calls to food2fork.com 
    async getResults() {
        // CORS- This API enables cross-origin requests to anywhere.
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'd9116bf99e3acef6866daf871a8cd0a6';

        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result= res.data.recipes;
        }
        catch (error) {
            alert(error);
        }
    }
}
