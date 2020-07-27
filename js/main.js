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

  window.loadData(function (photos) {
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i], i));
    }
    window.showBigPictures(photos);

    var createDiscussedArray = function () {
      inactivateFilterButtons();
      filterDiscussedElement.classList.add('img-filters__button--active');
      renderPhotos(getPhotosSortedByNumberOfComments(photos));
      filterDiscussedElement.removeEventListener('click', createDiscussedArray);
    };
    // filterDiscussedElement.addEventListener('click', window.debounce(function () {
    filterDiscussedElement.addEventListener('click', createDiscussedArray);

    filterRandomElement.addEventListener('click', window.debounce(function () {
      inactivateFilterButtons();
      filterRandomElement.classList.add('img-filters__button--active');
      renderPhotos(window.getRandomUniqueElements(photos, 10));
    }));

    filterDefaultElement.addEventListener('click', window.debounce(function () {
      inactivateFilterButtons();
      filterDefaultElement.classList.add('img-filters__button--active');
      renderPhotos(photos);
    }));
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

  var getPhotosSortedByNumberOfComments = function (photos) {
    return photos.slice().sort(function (a, b) {
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

  var renderPhotos = (function (photos) {
    clearPhotos();
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i], i));
    }
    window.showBigPictures(photos);
  });

})();

