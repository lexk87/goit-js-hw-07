import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector(".gallery");

function createGalleryMarkup(galleryItemsArr) {
    const galleryMarkup = galleryItemsArr.map(({ preview, original, description }) =>
        `<a class="gallery__item" href="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}" />
        </a>`
    ).join("");
    return galleryMarkup;
};

function injectGalleryMarkup(markup, injectionTarget) {
    injectionTarget.insertAdjacentHTML("beforeend", markup);
};

injectGalleryMarkup(createGalleryMarkup(galleryItems), galleryEl);

new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    captionsData: "alt",
});