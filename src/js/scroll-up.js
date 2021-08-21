import refs from './refs';

window.addEventListener('scroll', trackScroll);
refs.goToTopBtn.addEventListener('click', goBackToTop);

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.goToTopBtn.classList.add('is-visible');
  }
  if (scrolled < coords) {
    refs.goToTopBtn.classList.remove('is-visible');
  }
}

function goBackToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(goBackToTop, 0);
  }
}
