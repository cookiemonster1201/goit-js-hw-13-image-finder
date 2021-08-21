import '../sass/main.scss';
import refs from './refs';
import ImageSearchApi from './image-search-api-service';
import showLightboxImage from './lightbox';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import smallImageCardTpl from '../templates/preview-image-card.hbs';
import { noticeMsg, errorMsg, infoMsg, successMsg } from './pontify-notifications';
import scrollUp from './scroll-up';

const KEY = '22995461-dcfca2d4906f7ecb85a6d619d';
const BASE_URL = 'https://pixabay.com/api/?';
const imageSearchApi = new ImageSearchApi(KEY, BASE_URL);
registerIntersectionObserver();
infoMsg();

refs.searchForm.addEventListener('submit', onSubmit);
refs.gallery.addEventListener('click', onImageClick);
refs.searchOptionsMenu.addEventListener('click', onSearchOptionClick);

function onSubmit(e) {
  e.preventDefault();
  if (e.target.elements.query.value === '') {
    return;
  }

  imageSearchApi.searchOption = '';
  imageSearchApi.isEditorsChoice = false;
  clearMarkup();
  imageSearchApi.resetPage();
  imageSearchApi.searchQuery = e.target.elements.query.value;
  renderImages();
  imageSearchApi.incrementPage();
  e.target.elements.query.value = '';
}

function onImageClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const largeImgSrc = e.target.dataset.source;
  const largeImgAlt = e.target.alt;

  showLightboxImage(largeImgSrc, largeImgAlt);
}

function onSearchOptionClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  clearMarkup();
  imageSearchApi.resetPage();
  imageSearchApi.searchQuery = '';

  if (e.target.textContent === "Editor's Choice") {
    imageSearchApi.isEditorsChoice = true;
    imageSearchApi.searchOption = '';
    renderImages();
    return;
  }

  imageSearchApi.searchOption = e.target.textContent.toLowerCase();
  imageSearchApi.isEditorsChoice = false;
  renderImages();
}

function appendMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', smallImageCardTpl(data));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

async function renderImages() {
  try {
    const images = await imageSearchApi.fetchData();
    console.log(images);
    if (images.length === 0) {
      noticeMsg();
      return;
    }
    successMsg(imageSearchApi.page);
    appendMarkup(images);
    imageSearchApi.incrementPage();
  } catch {
    onError();
  }
}

function registerIntersectionObserver() {
  const options = {
    rootMargin: '200px',
  };

  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.sentinel);

  function onEntry(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting && imageSearchApi.page > 1) {
        refs.loadingDots.classList.add('is-visible');
        renderImages();
      }
    });
  }
}

function onError() {
  errorMsg();
}
