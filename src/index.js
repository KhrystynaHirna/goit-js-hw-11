import './sass/main.scss';
import './css/styles.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import photoCards from './photo_card.hbs';
import ImagesApiService from './images-service';

const searchEl = document.querySelector('.search-form');
const imagesGallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

const imagesApiService = new ImagesApiService();

searchEl.addEventListener('submit', onFormSubmit);
// searchEl.addEventListener('input', onFormInput);
loadMoreButton.addEventListener('click', onLoadMoreButton);
loadMoreButton.hidden = true;

async function onFormSubmit(e) {
    e.preventDefault();
    loadMoreButton.hidden = true;

    imagesApiService.query = e.currentTarget.searchQuery.value.trim();
    // imagesApiService.query = input;

    if (imagesApiService.query === '') {
        return Notiflix.Notify.warning("Please enter something.");
    }
    clearGalleryImagesMarkup();
    imagesApiService.resetPage();

    try {
        const responseImages = await imagesApiService.fetchImages().then(galleryImagesMarkup);
        // const dataImages = responseImages.then(response);

        if (responseImages === 0) {
            return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        } else {
            Notiflix.Notify.success(`Hooray! We found ${responseImages} images.`);
        }
        loadMoreButton.hidden = false;
        onLoadMoreButton();
        galleryImagesMarkup();
    }
    catch (error) {
        console.log(error);
    }
   onLoadMoreButton();
};
// function onFormInput() {
//    const input = evt.target.value.trim();
// }
function onLoadMoreButton() {
    imagesApiService.fetchImages().then(galleryImagesMarkup);
}
function galleryImagesMarkup(response) {
    imagesGallery.insertAdjacentHTML('beforeend', photoCards(response));
}
function clearGalleryImagesMarkup() {
    imagesGallery.innerHTML = '';
}