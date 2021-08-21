import { success, error, info, notice } from '@pnotify/core';

export { noticeMsg, errorMsg, infoMsg, successMsg };

function noticeMsg(pageNumber) {
  if (pageNumber > 1) {
    return;
  }
  notice({
    text: 'Please make a more specific request',
    delay: 2000,
  });
}

function infoMsg() {
  info({
    text: 'Welcome to image search service ;)',
    delay: 2000,
  });
}

function successMsg(pageNumber) {
  if (pageNumber > 1) {
    return;
  }
  success({
    text: 'Your pictures are here!!!',
    delay: 2000,
  });
}

function errorMsg() {
  error({
    text: 'Sorry, something went wrong(...',
    delay: 2000,
  });
}
