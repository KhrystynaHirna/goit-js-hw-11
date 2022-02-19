import './sass/main.scss';
import './css/styles.css';
import Notiflix from 'notiflix';
import { Axios } from 'axios';

const input = document.querySelector('form input');
const searchButton = document.querySelector('form button');
const BASE_URL = 'https://pixabay.com/api/?key=25789368-636c5d004c25f97cc91a0f5f4';

input.addEventListener('input', onInputForm);
searchButton.addEventListener('submit', onSearchButton);

// const userSearch = onInputForm();
let userSearch = '';

const searchImages = async() => {
    const response = await fetch(`${BASE_URL}&q=${userSearch}&image_type=photo`);
    const images = await response.json();
}

function onInputForm() {

}
function onSearchButton() {

}