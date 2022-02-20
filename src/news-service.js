const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
    constructor() {
        this.userSearch = '';
        this.page = 1;
        this.pageSize = 40;
}
    fetchArticles() {
        console.log(this);

    const options = {
    key: '25789368-636c5d004c25f97cc91a0f5f4',
    body: JSON.stringify(),
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
    headers: {
        "Image-Type": "photo",
     }   
        }
    const searchImages = async() => {
    const response = await (fetch(`${BASE_URL}&q=${this.userSearch}&pageSize=${this.pageSize}&page=${this.page}`), options);
    const totalHits = await response.json();
        return totalHits;
        }
        searchImages().then(totalHits => console.log(totalHits));
        this.incrementPage();
        return totalHits.articles;  
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
    set query(newQuery) {
        this.userSearch = newQuery;
    }
}