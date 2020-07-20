'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var uploadFileElement = document.querySelector('#upload-file');
  var picturesElement = document.querySelector('.pictures');
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  window.loadData(function (photos) {
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i], i));
    }
    window.showBigPictures(photos);
    getPhotosServer(photos);
  });
  var onUploadOverlayKeydown = function (evt) {
    if (evt.key === 'Escape') {
      window.onUploadOverlayClose();
    }
  };

  window.onUploadOverlayClose = function () {
    window.clearPreview();
    bodyElement.classList.remove('modal-open');
    uploadOverlayElement.classList.add('hidden');
    uploadCancelElement.removeEventListener('click', window.onUploadOverlayClose);
    document.removeEventListener('keydown', onUploadOverlayKeydown);
    uploadFileElement.value = '';
  };

  document.querySelector('#upload-file').addEventListener('change', function () {
    uploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    window.applyImageSettings();
    uploadCancelElement.addEventListener('click', window.onUploadOverlayClose);
    document.addEventListener('keydown', onUploadOverlayKeydown);
  });

  var photosCommentsNumber = [];
  var getPhotosCommentsNumber = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      photosCommentsNumber[i] = photos[i];
    }
    photosCommentsNumber.sort(function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    });

  };

  var buttonPhotosCommentsNumber = document.querySelector('.img-filters').querySelector('#filter-discussed');
  buttonPhotosCommentsNumber.classList.add('img-filters__button--active');
  var buttonPhotosRandom = document.querySelector('.img-filters').querySelector('#filter-random');
  buttonPhotosRandom.classList.add('img-filters__button--active');
  var buttonPhotos = document.querySelector('.img-filters').querySelector('#filter-default');

  var clearingPhotos = function (pistureChilds) {
    var elemLast = pistureChilds.lastChild;
    while (elemLast.tagName === 'A') {
      pistureChilds.removeChild(elemLast);
      elemLast = pistureChilds.lastChild;
    }
  };

  var loadDataPhotos = (function (photos) {
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i], i));
    }
    window.showBigPictures(photos);
  });

  var photosServer = [];
  var getPhotosServer = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      photosServer[i] = photos[i];
    }
  };

  var photosRandom = [];
  var getPhotosRandom = function (photos) {
    photosRandom = [];
    photosRandom[0] = photos[window.generateRandomNumber(0, 24)];
    var n = 1;
    while (n < 10) {
      photosRandom[n] = photos[window.generateRandomNumber(0, 24)];
      for (var i = 0; i < n; i++) {
        if (photosRandom[i] === photosRandom[n]) {
          photosRandom.pop();
        }
      }
      n = photosRandom.length;
    }
  };

  buttonPhotosCommentsNumber.addEventListener('click', function () {
    getPhotosCommentsNumber(photosServer);
    clearingPhotos(picturesElement);
    setTimeout(loadDataPhotos, 500, photosCommentsNumber);
  });

  buttonPhotosRandom.addEventListener('click', function () {
    getPhotosRandom(photosServer);
    clearingPhotos(picturesElement);
    setTimeout(loadDataPhotos, 500, photosRandom);
  });

  buttonPhotos.addEventListener('click', function () {
    clearingPhotos(picturesElement);
    setTimeout(loadDataPhotos, 500, photosServer);
  });

}());
