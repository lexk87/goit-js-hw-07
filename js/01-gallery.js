import { galleryItems } from './gallery-items.js';

const galleryEl = document.querySelector(".gallery");

function createGalleryMarkup(galleryItemsArr) {
    const galleryMarkup = galleryItemsArr.map(({ preview, original, description }) =>
        `<div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                />
            </a>
        </div>`
    ).join("");
    return galleryMarkup;
};

function injectGalleryMarkup(markup, injectionTarget) {
    injectionTarget.insertAdjacentHTML("beforeend", markup);
};

injectGalleryMarkup(createGalleryMarkup(galleryItems), galleryEl);

galleryEl.addEventListener("click", onImgClick);

const instance = basicLightbox.create(`<img src="">`, {
    onShow: () => document.addEventListener("keydown", onEscPress),
    onClose: (instance) => {
        document.removeEventListener("keydown", onEscPress);
        instance.element().querySelector("img").src = "";
    },
});

function onImgClick(e) {
    e.preventDefault();

    if (e.target.nodeName !== "IMG") {
        return;
    }

    instance.element().querySelector("img").src = `${e.target.dataset.source}`;
    instance.show();
};

function onEscPress(e) {
    if (e.code === "Escape" && instance.visible()) {
        instance.close();
    };
};