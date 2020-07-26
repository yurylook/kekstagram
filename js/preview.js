'use strict';

(function () {
  var MORE_SOCIAL_COMMENTS_NUMBER = 5;
  var MAX_EFFECT_LEVEL_PIN_ELEMENT_OFFSET_LEFT = 453;
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectLevelLineElement = document.querySelector('.effect-level__line');
  var bodyElement = document.querySelector('body');
  var imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');
  var buttonControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlValueElement = document.querySelector('.scale__control--value');
  var buttonControlBiggerElement = document.querySelector('.scale__control--bigger');
  var effectLevelElement = document.querySelector('.img-upload__effect-level');
  var hashtagElement = document.querySelector('.text__hashtags');
  var newUserCommentElement = document.querySelector('.social__footer input');
  var bigPictureDescriptionElement = document.querySelector('.social__caption');
  var textDescriptionElement = document.querySelector('.text__description');
  var socialCommentsElement = document.querySelector('.social__comments');
  var unreadSocialComments = [];
  var imageSettings = {
    scale: 100,
    effect: 'none',
    percentage: 1,
  };

  window.clearPreview = function () {
    hashtagElement.value = '';
    textDescriptionElement.value = '';
    imageSettings = {
      scale: 100,
      effect: 'none',
      percentage: 1,
    };
    window.applyImageSettings();
  };

  window.applyImageSettings = function () {
    var scalePersentage = imageSettings.scale / 100;
    document.querySelector('input#effect-' + imageSettings.effect).checked = true;
    var newEffectClass = 'effect__preview--' + imageSettings.effect;
    imgUploadPreviewImgElement.style = 'transform: scale(' + scalePersentage + '); '
      + window.getFilterStyle(imageSettings.effect, imageSettings.percentage);
    imgUploadPreviewImgElement.className = '';
    imgUploadPreviewImgElement.classList.add(newEffectClass);
    scaleControlValueElement.value = imageSettings.scale + '%';

    if (imageSettings.effect === 'none') {

      effectLevelElement.classList.add('hidden');
    } else {
      effectLevelElement.classList.remove('hidden');
    }
  };

  var getCheckedEffect = function () {
    return document.querySelector('input[name=effect]:checked').value;
  };

  buttonControlSmallerElement.addEventListener('click', function () {
    imageSettings.scale = window.clip(imageSettings.scale - 25, 25, 100);
    window.applyImageSettings();
  });

  buttonControlBiggerElement.addEventListener('click', function () {
    imageSettings.scale = window.clip(imageSettings.scale + 25, 25, 100);
    window.applyImageSettings();
  });

  hashtagElement.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  hashtagElement.addEventListener('input', function () {
    var tags = hashtagElement.value.split(' ').filter(function (tag) {
      return tag !== '';
    });
    hashtagElement.setCustomValidity(window.getValidationMessageError(tags));
  });
  document.querySelector('.img-upload__effects').addEventListener('change', function () {
    imageSettings.effect = getCheckedEffect();
    imageSettings.percentage = 1;
    effectLevelDepthElement.style.width = 100 + '%';
    effectLevelPinElement.style.left = MAX_EFFECT_LEVEL_PIN_ELEMENT_OFFSET_LEFT + 'px';
    window.applyImageSettings();
  });

  var showBigPicture = function (photo) {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture__img img').src = photo.url;
    document.querySelector('.likes-count').innerText = photo.likes;
    document.querySelector('.comments-count').innerText = photo.comments.length;
    document.querySelector('.social__comments-loader').classList.remove('hidden');
    socialCommentsElement.innerHTML = '';
    bigPictureDescriptionElement.innerText = photo.description;
    document.querySelector('.social__comment-count').classList.add('hidden');
    bodyElement.classList.add('modal-open');
    unreadSocialComments = photo.comments.slice();
    renderMoreSendComments();
  };

  var renderMoreSendComments = function () {
    var numberOfUnreadComments = unreadSocialComments.length;
    for (var i = 0; i < Math.min(numberOfUnreadComments, MORE_SOCIAL_COMMENTS_NUMBER); i++) {
      var socialCommentElement = window.generateSocialCommentNode(unreadSocialComments[0]);
      socialCommentsElement.appendChild(socialCommentElement);
      unreadSocialComments.shift();
    }
    if (unreadSocialComments.length === 0) {
      document.querySelector('.social__comments-loader').classList.add('hidden');
    }
  };
  document.querySelector('.social__comments-loader').addEventListener('click', function () {
    renderMoreSendComments();
  });

  var hideBigPicture = function () {
    document.querySelector('.big-picture').classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  };

  document.querySelector('#picture-cancel').addEventListener('click', function () {
    hideBigPicture();
  });

  var hideBigPictureKey = function (evt) {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  };
  document.addEventListener('keydown', hideBigPictureKey);

  window.showBigPictures = function (photos) {
    document.querySelector('.pictures').addEventListener('click', function (evt) {
      var dataId = evt.target.getAttribute('data-id');
      if (dataId === null || dataId === '') {
        return;
      }
      var index = +dataId;
      showBigPicture(photos[index]);
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.key !== 'Enter') {
        return;
      }
      var child = evt.target.querySelector('img');
      if (child === null) {
        return;
      }
      var dataId = child.getAttribute('data-id');
      if (dataId === null || dataId === '') {
        return;
      }
      var index = +dataId;
      showBigPicture(photos[index]);
    });
  };

  newUserCommentElement.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      effectLevelPinElement.style.left = window.clip(effectLevelPinElement.offsetLeft - shift.x, 0, effectLevelLineElement.offsetWidth) + 'px';
      effectLevelDepthElement.style.width = (effectLevelPinElement.offsetLeft / effectLevelLineElement.offsetWidth * 100) + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      imageSettings.effect = getCheckedEffect();
      imageSettings.percentage = effectLevelPinElement.offsetLeft / effectLevelLineElement.offsetWidth;
      window.applyImageSettings();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
