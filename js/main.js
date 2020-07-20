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
    window.getRandomUniqueElements(photos, 10);
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
  var getPhotosSortedByNumberOfComments = function (photos) {
    photosCommentsNumber = photos.slice();
    photosCommentsNumber.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return photosCommentsNumber;
  };

  var buttonPhotosCommentsNumber = document.querySelector('.img-filters').querySelector('#filter-discussed');
  buttonPhotosCommentsNumber.classList.add('img-filters__button--active');
  var buttonPhotosRandom = document.querySelector('.img-filters').querySelector('#filter-random');
  buttonPhotosRandom.classList.add('img-filters__button--active');
  var buttonPhotos = document.querySelector('.img-filters').querySelector('#filter-default');

  var makeEmptyArrayOfPhotos = function (pistureChilds) {
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
    photosServer = photos.slice();
    return photosServer;
  };

  var photosRandom = [];

  buttonPhotosCommentsNumber.addEventListener('click', window.debounce(function () {
    getPhotosSortedByNumberOfComments(photosServer);
    makeEmptyArrayOfPhotos(picturesElement);
    loadDataPhotos(photosCommentsNumber);
  }));

  buttonPhotosRandom.addEventListener('click', window.debounce(function () {
    photosRandom = window.getRandomUniqueElements(photosServer, 10);
    makeEmptyArrayOfPhotos(picturesElement);
    loadDataPhotos(photosRandom);
  }));

  buttonPhotos.addEventListener('click', window.debounce(function () {
    makeEmptyArrayOfPhotos(picturesElement);
    loadDataPhotos(photosServer);
  }));

}());
