import axios from "axios";
export default class ImagesApiService {
    constructor() {
        this.userSearch = '';
        this.page = 1;
        this.per_page = 40;
    }
    // robymo zapyt na kartynky metodom get
   async fetchImages () {
       try {
           const BASE_URL = 'https://pixabay.com/api/';
           const API_KEY = '25789368-636c5d004c25f97cc91a0f5f4';
           const parameters = `lang=en&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;
           const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.userSearch}&${parameters}`);   
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