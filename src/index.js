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


function onFormSubmit(e) {
    e.preventDefault();
    loadMoreButton.hidden = true;
    //  te szczo wwodytymut korystuwaczi
    imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

    if (imagesApiService.query === '') {
        return Notiflix.Notify.warning("Please enter something.");
    }
    clearGalleryImagesMarkup();
    imagesApiService.resetPage();

    // te szczo korystuwaczi otrymajut
    imagesApiService.fetchImages().then(pictures => {
        if (pictures.data.totalHits !== 0 && pictures.data.hits.length !== 0) {
            Notiflix.Notify.success(`Hooray! We found ${pictures.data.totalHits} images.`);
            loadMoreButton.hidden = false;
        } else {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }
            if (pictures.data.totalHits < 40) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoreButton.hidden = true;
            }
        
        galleryImagesMarkup(pictures);
        let lightbox = new SimpleLightbox('.gallery a', {
                captionsData: 'alt',
                captionDelay: 250
            });
    });
}
function onLoadMoreButton() {
    imagesApiService.fetchImages().then(galleryImagesMarkup);
}
function galleryImagesMarkup(pictures) {
    imagesGallery.insertAdjacentHTML('beforeend', photoCards(pictures));
}
function clearGalleryImagesMarkup() {
    imagesGallery.innerHTML = '';
};
