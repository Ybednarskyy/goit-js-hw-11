import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  submit: document.querySelector('button[type="submit"]'),
  loadMore: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

// console.log('submit -> ', refs.submit);

async function getImages(description) {
  await axios
    .get(`https://pixabay.com/api/`, {
      params: {
        key: '31582122-c0bce89aa4307e5dda7d53da1',
        q: description,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: '1',
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

console.log(getImages());

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
        return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
    </div>`;
      }
    )
    .join('');
  refs.gallery.innerHTML = markup;
}
