import './sass/main.scss';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { Axios } from 'axios';
import photoCards from './photo_card.hbs';
import NewsApiService from './news-service';

const searchButton = document.querySelector('.search-button');
const loadMoreButton = document.querySelector('.load-more');
const articlesGallery = document.querySelector('.gallery');
const newsApiService = new NewsApiService();

searchButton.addEventListener('submit', onSearchButton);
loadMoreButton.addEventListener('click', onLoadMoreButton);

function onSearchButton(evt) {
    evt.preventDefault();

    newsApiService.query = evt.currentTarget.elements.query.value;
    newsApiService.fetchImages().then(galleryArticlesMarkup);
    clearGalleryArticlesMarkup();
    newsApiService.resetPage();
}
function onLoadMoreButton() {
    newsApiService.fetchImages().then(galleryArticlesMarkup);
}
function galleryArticlesMarkup(articles) {
    articlesGallery.insertAdjacentHTML('beforeend', photoCards(articles));
}
function clearGalleryArticlesMarkup() {
    articlesGallery.innerHTML = '';
}