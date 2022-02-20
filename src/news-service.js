import axios from "axios";

export default class NewsApiService {
    constructor() {
        this.BASE_URL = 'https://pixabay.com/api/';
        this.API_KEY = '?key=25789368-636c5d004c25f97cc91a0f5f4';
        this.lang = 'lang=en';
        this.image_type = 'image_type=photo';
        this.orientation = 'orientation=horizontal';
        this.safesearch = 'safesearch=true';
        this.userSearch = '';
        this.page = 1;
        this.per_page = 40;
    }
    async fetchImages() {
        const parameters = `${this.lang}&${this.image_type}&${this.orientation}&${this.safesearch}&page=${this.page}&per_page=${this.per_page}`;
        const response = await axios.get(`${this.BASE_URL}${this.API_KEY}&q=${this.userSearch}&${parameters}`);
        console.log(response);
        this.incrementPage();
        
        return response;
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