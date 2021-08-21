import { success, error, info, notice } from '@pnotify/core';

export { noticeMsg, errorMsg, infoMsg, successMsg };

function noticeMsg() {
  notice({
    text: 'Welcome back ;)',
  });
}

function infoMsg() {
  info({
    text: 'Welcome to image search service ;)',
    delay: 2000,
  });
}

function successMsg(pageNumber) {
  if (pageNumber !== 2) {
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
    delay: 3500,
  });
}