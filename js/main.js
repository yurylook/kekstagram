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
    getPhotosRandom(photos);
    getPhotosCommentsNumber(photos);
  });

  var onUploadOverlayKeydown = function (evt) {
    if (evt.key === 'Escape') {
      onUploadOverlayClose();
    }
  };

  var onUploadOverlayClose = function () {
    bodyElement.classList.remove('modal-open');
    uploadOverlayElement.classList.add('hidden');
    uploadCancelElement.removeEventListener('click', onUploadOverlayClose);
    document.removeEventListener('keydown', onUploadOverlayKeydown);
    uploadFileElement.value = '';
  };

  document.querySelector('#upload-file').addEventListener('change', function () {
    uploadOverlayElement.classList.remove('hidden');
    bodyElement.classList.add('modal-open');
    window.applyImageSettings();
    uploadCancelElement.addEventListener('click', onUploadOverlayClose);
    document.addEventListener('keydown', onUploadOverlayKeydown);
  });

  var photosRandom = [];
  var getPhotosRandom = function (photos) {
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
    console.log(photosRandom);
  };

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
    console.log(photosCommentsNumber);
  };

}());
