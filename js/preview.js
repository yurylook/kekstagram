'use strict';

(function () {
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var bodyElement = document.querySelector('body');
  var imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
  var buttonControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var buttonControlBigger = document.querySelector('.scale__control--bigger');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var hashtag = document.querySelector('.text__hashtags');
  var newUserComment = document.querySelector('.social__footer').querySelector('input');
  var textDescription = document.querySelector('.text__description');
  var socialComments = document.querySelector('.social__comments');
  var moreSocialCommentsNumber = 5;
  var imageSettings = {
    scale: 100,
    effect: 'none',
    percentage: 1,
  };

  window.clearPreview = function () {
    hashtag.value = '';
    textDescription.value = '';
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
      window.applyImageSettings();
    }
  });

  buttonControlBigger.addEventListener('click', function () {
    if (imageSettings.scale < 100) {
      imageSettings.scale += 25;
      window.applyImageSettings();
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
    window.applyImageSettings();
  });

  var generateSocialCommentNode = function (comment) {
    var template = document.querySelector('#social_comment_template').content;
    var socialCommentElement = template.cloneNode(true);
    var socialCommentImageElement = socialCommentElement.querySelector('img');
    socialCommentImageElement.src = comment.avatar;
    socialCommentImageElement.alt = comment.name;
    socialCommentElement.querySelector('.social__text').innerText = comment.message;
    return socialCommentElement;
  };

  var showBigPicture = function (photo) {
    document.querySelector('.big-picture').classList.remove('hidden');
    document.querySelector('.big-picture__img img').src = photo.url;
    document.querySelector('.likes-count').innerText = photo.likes;
    document.querySelector('.comments-count').innerText = photo.comments.length;
    document.querySelector('.social__comments-loader').classList.remove('hidden');
    socialComments.innerHTML = '';

    getUnreadSocialComments(photo);
    var bigPictureDescription = document.querySelector('.social__caption');
    bigPictureDescription.innerText = photo.description;
    document.querySelector('.social__comment-count').classList.add('hidden');
    bodyElement.classList.add('modal-open');
  };

  var unreadSocialCommerts = [];
  var getUnreadSocialComments = function (photo) {
    unreadSocialCommerts = photo.comments.slice();
    renderMoreSendComments();
  };


  var renderMoreSendComments = function () {
    var numberOfUnreadComments = unreadSocialCommerts.length;
    for (var i = 0; i < Math.min(numberOfUnreadComments, moreSocialCommentsNumber); i++) {
      var socialCommentElement = generateSocialCommentNode(unreadSocialCommerts[0]);
      socialComments.appendChild(socialCommentElement);
      unreadSocialCommerts.shift();
    }
    if (unreadSocialCommerts.length === 0) {
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

  newUserComment.addEventListener('keydown', function (evt) {
    evt.stopPropagation();
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
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

      effectLevelPin.style.left = window.clip(effectLevelPin.offsetLeft - shift.x, 0, effectLevelLine.offsetWidth) + 'px';
      effectLevelDepth.style.width = (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100) + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      imageSettings.effect = document.querySelector('input[name=effect]:checked').value;
      imageSettings.percentage = effectLevelPin.offsetLeft / effectLevelLine.offsetWidth;
      window.applyImageSettings();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
