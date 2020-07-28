'use strict';

(function () {
  var bodyElement = document.querySelector('body');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var uploadFileElement = document.querySelector('#upload-file');
  var picturesElement = document.querySelector('.pictures');
  var filterDiscussedElement = document.querySelector('#filter-discussed');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDefaultElement = document.querySelector('#filter-default');
  var filterButtonElements = document.querySelectorAll('.img-filters__button');

  var inactivateFilterButtons = function () {
    for (var i = 0; i < filterButtonElements.length; i++) {
      filterButtonElements[i].classList.remove('img-filters__button--active');
    }
  };


  var onClickFilterDiscussed = window.debounce(function () {
    inactivateFilterButtons();
    window.removeEventListeners();
    filterDiscussedElement.classList.add('img-filters__button--active');
    window.photos = getPhotosSortedByNumberOfComments(window.photosFromServer);
    renderPhotos();
  });

  var onClickFilterRandom = window.debounce(function () {
    inactivateFilterButtons();
    window.removeEventListeners();
    filterRandomElement.classList.add('img-filters__button--active');
    window.photos = window.getRandomUniqueElements(window.photosFromServer, 10);
    renderPhotos();
  });

  var onClickFilterDefailt = window.debounce(function () {
    inactivateFilterButtons();
    window.removeEventListeners();
    filterDefaultElement.classList.add('img-filters__button--active');
    window.photos = window.photosFromServer.slice();
    renderPhotos();
  });

  window.loadData(function (photos) {
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i], i));
    }
    window.photosFromServer = photos.slice();
    window.photos = photos.slice();

    window.showBigPictures();
    filterDiscussedElement.addEventListener('click', onClickFilterDiscussed);
    filterRandomElement.addEventListener('click', onClickFilterRandom);
    filterDefaultElement.addEventListener('click', onClickFilterDefailt);
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

  var getPhotosSortedByNumberOfComments = function () {
    return window.photosFromServer.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var clearPhotos = function () {
    var elemLast = picturesElement.lastChild;
    while (elemLast.tagName === 'A') {
      picturesElement.removeChild(elemLast);
      elemLast = picturesElement.lastChild;
    }

  };

  var renderPhotos = function () {
    clearPhotos();
    for (var i = 0; i < window.photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(window.photos[i], i));
    }
    window.showBigPictures();
  };

})();

