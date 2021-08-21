import * as basicLightbox from 'basiclightbox';
export default function (url, alt) {
  basicLightbox
    .create(
      `<img
  src='${url}'
  alt='${alt}'
/>`,
    )
    .show();
}
