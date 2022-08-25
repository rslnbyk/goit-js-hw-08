import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const gallery = document.querySelector('.gallery');

const htmlGallery = galleryItems.map(
  el =>
    `<li><a class="gallery__item" href=${el.original}><img class="gallery__image" src=${el.preview} alt="${el.description}"/></a></li>`
);

gallery.innerHTML = htmlGallery.join('');

const lightbox = new SimpleLightbox(`.gallery a`, {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
