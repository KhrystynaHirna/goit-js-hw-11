import './sass/main.scss';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { Axios } from 'axios';
import photoCards from './photo_card.hbs';
import ImagesApiService from './images-service';

const inputEl = document.querySelector('form input');
const searchButton = document.querySelector('.search-button');
const loadMoreButton = document.querySelector('.load-more');
const imagesGallery = document.querySelector('.gallery');
const imagesApiService = new ImagesApiService();

searchButton.addEventListener('submit', onSearchButton);
loadMoreButton.addEventListener('click', onLoadMoreButton);

async function onSearchButton(evt) {
    evt.preventDefault();
    onLoadMoreButton();

    const input = inputEl.currentTarget.elements.value.trim();
    if (input === '') {
        return Notiflix.Notify.warning("Please enter something.");
    }
    clearGalleryImagesMarkup();
    imagesApiService.resetPage();
    imagesApiService.userSearch = input;

    try {
        const response = await imagesApiService.fetchImages();
        const dataImages = response.data.hits;

        if (dataImages.length === 0) {
            return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        }
        Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
        onLoadMoreButton();
        galleryImagesMarkup(dataImages);
    }
    catch (error) {
        errorCatch(error);
    }
};

function onLoadMoreButton() {
    imagesApiService.fetchImages().then(galleryImagesMarkup);
}
function galleryImagesMarkup() {
    imagesGallery.insertAdjacentHTML('beforeend', photoCards());
}
function clearGalleryImagesMarkup() {
    imagesGallery.innerHTML = '';
}