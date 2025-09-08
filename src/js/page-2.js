import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'loaders.css/loaders.min.css';

const API_KEY = '52176910-9d30b506fbb06ea9df25b7e20';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 40;

const refs = {
  form: document.getElementById('search-form'),
  input: document.getElementById('search-input'),
  gallery: document.getElementById('gallery'),
  loader: document.getElementById('loader'),
};

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSearch);

function showLoader() {
  refs.loader.setAttribute('aria-hidden', 'false');
  refs.loader.style.display = 'flex';
}

function hideLoader() {
  refs.loader.setAttribute('aria-hidden', 'true');
  refs.loader.style.display = 'none';
}

async function onSearch(e) {
  e.preventDefault();
  const query = refs.input.value.trim();
  if (!query) return;

  clearGallery();
  showLoader();

  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: String(PER_PAGE),
  });

  try {
    const url = `${BASE_URL}?${params.toString()}`;
    const { data } = await axios.get(url);

    if (!data.hits || data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    const markup = buildGalleryMarkup(data.hits);
    refs.gallery.innerHTML = markup;

    lightbox.refresh();
  } catch (err) {
    console.error(err);
    iziToast.error({
      title: 'Error',
      message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function buildGalleryMarkup(items) {
  return items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery-item">
  <a href="${largeImageURL}" class="card-link">
    <img src="${webformatURL}" alt="${escapeHtml(tags)}" loading="lazy" />
    <div class="card-stats">
      <span><b>Likes</b> ${likes}</span>
      <span><b>Views</b> ${views}</span>
      <span><b>Comments</b> ${comments}</span>
      <span><b>Downloads</b> ${downloads}</span>
    </div>
  </a>
</li>`
    )
    .join('');
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    m =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }[m])
  );
}
