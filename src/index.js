import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  submit: document.querySelector('button[type="submit"]'),
  loadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

let description = null;
let currentPage = 1;

refs.submit.addEventListener('click', clickSubmitHandler);
refs.loadMore.addEventListener('click', loadMoreHandler);

function clickSubmitHandler(e) {
  e.preventDefault();

  refs.gallery.innerHTML = '';
  description = refs.input.value;
  getImages(description);

  console.log(refs.form.elements[0].value);
}

function loadMoreHandler() {
  currentPage++;
  getImages(description);
}

async function getImages(description) {
  await axios
    .get(`https://pixabay.com/api/`, {
      params: {
        key: '31582122-c0bce89aa4307e5dda7d53da1',
        q: description,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: currentPage,
        per_page: '40',
      },
    })
    .then(response => {
      const images = response.data.hits;
      if (!images.length) {
        return Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      makeImagesList(images);
    })
    .catch(error => {
      console.log(error);
    });
}

// console.log(getImages());

function makeImagesList(imalges) {
  const markup = imalges
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="photo-card gallery__item">
      <a class="gallery__item" href=${largeImageURL}>
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
      </a>
    </li>`;
      }
    )
    .join('');
  refs.gallery.innerHTML = markup;

  lightBox.refresh();
}

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
