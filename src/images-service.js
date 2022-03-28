import axios from "axios";
export default class ImagesApiService {
    constructor() {
        this.BASE_URL = 'https://pixabay.com/api/';
        this.API_KEY = '25789368-636c5d004c25f97cc91a0f5f4';
        this.lang = 'lang=en';
        this.image_type = 'image_type=photo';
        this.orientation = 'orientation=horizontal';
        this.safesearch = 'safesearch=true';
        this.userSearch = '';
        this.page = 1;
        this.per_page = 40;
    }
    // robymo zapyt na kartynky metodom get
   async fetchImages () {
        try {
        const parameters = `${this.lang}&${this.image_type}&${this.orientation}&${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;
        const response = await axios.get(`${this.BASE_URL}?key={${this.API_KEY}}&q=${this.userSearch}&${parameters}`);   
            this.incrementPage();
            return response;
        } catch (error) {
        return Error;
        }  
    }
        incrementPage() {
            this.page += 1;
        }
        resetPage() {
            this.page = 1;
        }
    get query() {
            return this.userSearch;
        }
    set query(newUserSearch) {
            this.userSearch = newUserSearch;
        }
}