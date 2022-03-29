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
loadMoreButton.addEventListener('click', onLoadMoreButton);
loadMoreButton.hidden = true;

async function onFormSubmit(e) {
    e.preventDefault();
    loadMoreButton.hidden = true;

    imagesApiService.query = e.target.searchQuery.value.trim();
    

    if (imagesApiService.query === '') {
        return Notiflix.Notify.warning("Please enter something.");
    }
    clearGalleryImagesMarkup();
    imagesApiService.resetPage();

    try {
        const responseImages = await imagesApiService.fetchImages().then(galleryImagesMarkup);

        if (responseImages === 0) {
            return Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
        } else {
            Notiflix.Notify.success(`Hooray! We found ${imagesApiService.query} images.`);
        }
        loadMoreButton.hidden = false;
        onLoadMoreButton();
        galleryImagesMarkup();
    }
    catch (error) {
        console.log(error);
    }
};

function onLoadMoreButton() {
    imagesApiService.fetchImages().then(galleryImagesMarkup);
}
function galleryImagesMarkup(responseImages) {
    imagesGallery.insertAdjacentHTML('beforeend', photoCards(responseImages));
}
function clearGalleryImagesMarkup() {
    imagesGallery.innerHTML = '';
}