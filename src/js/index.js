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
const imageSearchApi = new ImageSearchApi(KEY, BASE_URL, refs.loadingDots);

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
  resetApi();
  imageSearchApi.searchQuery = e.target.elements.query.value;
  loadInitialImages();
  e.target.elements.query.value = '';
}

function onSearchOptionClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  resetApi();
  imageSearchApi.searchQuery = '';

  if (e.target.textContent === "Editor's Choice") {
    imageSearchApi.isEditorsChoice = true;
    imageSearchApi.searchOption = '';
    loadInitialImages();
    return;
  }

  imageSearchApi.searchOption = e.target.textContent.toLowerCase();
  imageSearchApi.isEditorsChoice = false;
  loadInitialImages();
}

function onImageClick(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const largeImgSrc = e.target.dataset.source;
  const largeImgAlt = e.target.alt;

  showLightboxImage(largeImgSrc, largeImgAlt);
}

function appendMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', smallImageCardTpl(data));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

async function renderGallery() {
  try {
    const images = await imageSearchApi.fetchData();
    if (images.length === 0) {
      noticeMsg();
      return;
    }

    successMsg(imageSearchApi.page);
    appendMarkup(images);
    showSentinel();
    showStats();
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
      if (entry.isIntersecting && imageSearchApi.page !== 1) {
        renderGallery();
        imageSearchApi.incrementPage();
      }
    });
  }
}

function onError() {
  errorMsg();
}

function showSentinel() {
  setTimeout(() => {
    refs.sentinel.classList.add('is-visible');
  }, 1000);
}

function hideSentinel() {
  refs.sentinel.classList.remove('is-visible');
}

function resetApi() {
  hideSentinel();
  clearMarkup();
  imageSearchApi.resetPage();
}

function loadInitialImages() {
  renderGallery();
  imageSearchApi.incrementPage();
}

function showStats() {
  setTimeout(() => {
    document.querySelectorAll('.stats').forEach(stat => stat.classList.add('are-visible'));
  }, 400);
}
