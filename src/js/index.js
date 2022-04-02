import '../sass/main.scss';
import '../css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import photoCards from '../photo_card.hbs';
import { getImages } from './images-service';

const searchEl = document.querySelector('.search-form');
const imagesGallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let queryInput = '';
let page = 1;
let timerId = null;

searchEl.addEventListener('submit', onFormSubmit);
searchEl.addEventListener('input', onInput);
loadMoreButton.addEventListener('click', onLoadMoreButton);
loadMoreButton.hidden = true;

function onFormSubmit(e) {
    e.preventDefault();
    loadMoreButton.hidden = true;
    clearGalleryImagesMarkup();

if (queryInput !== '') {
        getImages(queryInput)
        .then(createGallery)
        .catch(noResultsMessage);
    } else Notiflix.Notify.warning("Please enter something.")
    page = 1;
}
function onInput(e) {
    queryInput = e.target.value.trim();
}
function createGallery(images) {
    clearInterval(timerId);
    if (images.totalHits === 0) {
            noResultsMessage(images);
    } else {
        galleryImagesMarkup(images);
        loadMoreButton.hidden = false;
        
        if (images.hits.length < 40) {
            endOfListMessage();
            loadMoreButton.hidden = true;
          }
        }
        if (page === 1 & images.totalHits > 0) {
        resultsMessage(images);
        }
}
function resultsMessage(images) {
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
}
function noResultsMessage() {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}
function endOfListMessage() {
    timerId = setTimeout(() => {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
    }, 800)
}
function onLoadMoreButton() {
    page += 1;
    getImages(queryInput, page)
        .then(images => {
            createGallery(images);
            smoothScroll();
        })
        .catch(noResultsMessage);
}
function smoothScroll() {
  const { height: cardHeight } = imagesGallery 
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
  });  
}
function galleryImagesMarkup(images) {
    images.hits.map(image => {
    imagesGallery.insertAdjacentHTML('beforeend', photoCards(image));
    })
    let lightbox = new SimpleLightbox('.photo-card a');
    lightbox.on('show.simplelightbox', function () { });
    lightbox.refresh();
}
function clearGalleryImagesMarkup() {
    imagesGallery.innerHTML = '';
}




