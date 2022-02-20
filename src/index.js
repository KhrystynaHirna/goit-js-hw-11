import './sass/main.scss';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { Axios } from 'axios';
import photoCards from './photo_card.hbs';

const input = document.querySelector('form input');
const searchButton = document.querySelector('form button');
const BASE_URL = 'https://pixabay.com/api/?key=25789368-636c5d004c25f97cc91a0f5f4';

input.addEventListener('input', onInputForm);
searchButton.addEventListener('click', onSearchButton);

// const userSearch = onInputForm();
let userSearch = '';
let page = 1;
let per_page = 40;

const options = {
    key: '25789368-636c5d004c25f97cc91a0f5f4',
    body: JSON.stringify(),
    q: currentTarget.value,
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
    // headers: {
    //     "Content-Type": "application/json; charset=UTF-8",
    // }   
};

const searchImages = async() => {
    const response = await (fetch(`${BASE_URL}&q=${userSearch}&image_type`), options);
    const totalHits = await response.json();
    return totalHits;
}
searchImages().then(images => console.log(images));

function onInputForm(evt) {
    userSearch = evt.currentTarget.value;
  
};

function onSearchButton(evt) {
    // evt.preventDefault();
  // maje zapustytys poszuk searchImages
    // tut maje povernutys searchImages
}