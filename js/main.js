'use strict';

(function () {

  var picturesElement = document.querySelector('.pictures');
  var bodyElement = document.querySelector('body');
  var uploadOverlayElement = document.querySelector('.img-upload__overlay');
  var uploadCancelElement = document.querySelector('#upload-cancel');
  var uploadFileElement = document.querySelector('#upload-file');
  var imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
  var buttonControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var buttonControlBigger = document.querySelector('.scale__control--bigger');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var hashtag = document.querySelector('.text__hashtags');

  window.loadData(function (photos) {
    for (var i = 0; i < photos.length; i++) {
      picturesElement.appendChild(window.generatePictureNode(photos[i]));
    }
    getPhotosRandom(photos);
    getPhotosCommentsNumber(photos);
    showBigPicture(photos[0]);
    showBigPictures(photos);
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
    applyImageSettings();
    uploadCancelElement.addEventListener('click', onUploadOverlayClose);
    document.addEventListener('keydown', onUploadOverlayKeydown);
  });

  var imageSettings = {
    scale: 100,
    effect: 'none',
    percentage: 1,
  };

  var applyImageSettings = function () {
    var scalePersentage = imageSettings.scale / 100;
    var newEffectClass = 'effect__preview--' + imageSettings.effect;
    imgUploadPreviewImg.style = 'transform: scale(' + scalePersentage + '); '
    + window.getFilterStyle(imageSettings.effect, imageSettings.percentage);
    imgUploadPreviewImg.className = '';
    imgUploadPreviewImg.classList.add(newEffectClass);
    scaleControlValue.value = imageSettings.scale + '%';

    if (imageSettings.effect === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  };

  buttonControlSmaller.addEventListener('click', function () {
    if (imageSettings.scale > 25) {
      imageSettings.scale -= 25;
      applyImageSettings();
    }
  });

  buttonControlBigger.addEventListener('click', function () {
    if (imageSettings.scale < 100) {
      imageSettings.scale += 25;
      applyImageSettings();
    }
  });

  hashtag.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  hashtag.addEventListener('input', function () {
    var tags = hashtag.value.split(' ').filter(function (tag) {
      return tag !== '';
    });
    hashtag.setCustomValidity(window.getValidationMessageError(tags));
  });
  document.querySelector('.img-upload__effects').addEventListener('change', function () {
    imageSettings.effect = document.querySelector('input[name=effect]:checked').value;
    imageSettings.percentage = 1;
    applyImageSettings();
  });

  effectLevelPin.addEventListener('mouseup', function () {
    imageSettings.effect = document.querySelector('input[name=effect]:checked').value;
    imageSettings.percentage = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth;
    applyImageSettings();
  });

  var showBigPicture = function (photo) {
    document.querySelector('.big-picture').
    classList.remove('hidden');
    document.querySelector('.big-picture__img img ').
    src = photo.url;
    document.querySelector('.likes-count').
    innerText = photo.likes;
    var commentCount = document.querySelector('.comments-count');
    commentCount.innerText = photo.comments.length;
    var socialComments = document.querySelector('.social__comment');
    for (var i = 0; i < photo.comments.length; i++) {
      socialComments.src = photo.comments[i].avatar;
      socialComments.alt = photo.comments[i].name;
      socialComments.width = 35;
      socialComments.height = 35;
      socialComments.querySelector('.social__text').innerText = photo.comments[i].message;
    }
    var bigPictureDescription = document.querySelector('.social__caption');
    bigPictureDescription.innerText = photo.description;
    document.querySelector('.social__comment-count').
    classList.add('hidden');
    document.querySelector('.social__comments-loader ').
    classList.add('hidden');
    bodyElement.classList.add('modal-open');
  };
  var bigPictureCansel = function () {
    document.querySelector('.big-picture').
    classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  };

  document.querySelector('#picture-cancel').
  addEventListener('click', function () {
    bigPictureCansel();
  });

  var bigPictureCanselKey = function (evt) {
    if (evt.key === 'Escape') {
      bigPictureCansel();
    }
  };
  document.addEventListener('keydown', bigPictureCanselKey);

  var showBigPictures = function (photos) {
    document.querySelector('.pictures').
    addEventListener('click', function (evt) {
      if (evt.target.src[30] !== '.') {
        var index = evt.target.src[29] + evt.target.src[30];
      } else {
        index = (evt.target.src[29]);
      }
      showBigPicture(photos[index - 1]);
    });
  };
  var maxLengthDescription = 3;
  var description = document.querySelector('.social__footer').
  querySelector('input');
  description.addEventListener('input', function () {
    if (description.value.length > maxLengthDescription) {
      description.setCustomValidity('длина комментария не может быть больше 20 символов');
    } else {
      description.setCustomValidity('');
      console.log(description.value);
    }
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
    for (var i = 0; i < 25; i++) {
      photosCommentsNumber.push(photos[i]);
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
