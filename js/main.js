'use strict';

var COMMENT_MOCKS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

var AUTHOR_MOCKS = [
  'Юрий',
  'Олег',
  'Светлана',
  'Артем',
  'Ольга',
];

var generateRandomNumber = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var generateComments = function (numberOfComments) {
  var comments = [];
  for (var i = 0; i < numberOfComments; i++) {
    comments.push({
      avatar: 'img/avatar-' + generateRandomNumber(1, 6) + '.svg',
      message: COMMENT_MOCKS[generateRandomNumber(0, COMMENT_MOCKS.length - 1)],
      name: AUTHOR_MOCKS[generateRandomNumber(0, AUTHOR_MOCKS.length - 1)],
    });
  }
  return comments;
};

var generatePhotos = function () {
  var photos = [];
  for (var i = 1; i < 26; i++) {
    photos.push({
      url: 'photos/' + i + '.jpg',
      description: 'описание',
      likes: generateRandomNumber(15, 200),
      comments: generateComments(generateRandomNumber(0, 4)),
    });
  }
  return photos;
};
var photos = generatePhotos();

var generatePictureNode = function (pictureData) {
  var template = document
  .querySelector('#picture')
  .content
  .querySelector('a');

  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
  pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;

  return pictureElement;
};
var picturesElement = document.querySelector('.pictures');
for (var i = 0; i < photos.length; i++) {
  picturesElement.appendChild(generatePictureNode(photos[i])
  );
}

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

var onuploadOverlayKeydown = function (evt) {
  if (evt.key === 'Escape') {
    onuploadOverlayClose();
  }
};

var onuploadOverlayClose = function () {
  bodyElement.classList.remove('modal-open');
  uploadOverlayElement.classList.add('hidden');
  uploadCancelElement.removeEventListener('click', onuploadOverlayClose);
  document.removeEventListener('keydown', onuploadOverlayKeydown);
  uploadFileElement.value = '';
};

document.querySelector('#upload-file').addEventListener('change', function () {
  uploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  uploadCancelElement.addEventListener('click', onuploadOverlayClose);
  document.addEventListener('keydown', onuploadOverlayKeydown);
});

var getFilterStyle = function (newEffect, persentage) {
  if (newEffect === 'none') {
    return '';
  }
  if (newEffect === 'chrome') {
    return 'filter: grayscale(' + persentage + ');';
  }
  if (newEffect === 'sepia') {
    return 'filter: sepia(' + persentage + ');';
  }
  if (newEffect === 'marvin') {
    return 'filter: invert(' + persentage * 100 + '%);';
  }
  if (newEffect === 'phobos') {
    return 'filter: blur(' + (1 + persentage * 2) + 'px);';
  }
  if (newEffect === 'heat') {
    return 'filter: brightness(' + persentage * 3 + ');';
  } return newEffect;
};

var imageSettings = {
  scale: 100,
  effect: 'none',
  percentage: 1,
};

var applyImageSettings = function () {
  var scalePersentage = imageSettings.scale / 100;
  var newEffectClass = 'effect__preview--' + imageSettings.effect;

  imgUploadPreviewImg.style = 'transform: scale(' + scalePersentage + '); '
    + getFilterStyle(imageSettings.effect, imageSettings.percentage);

  imgUploadPreviewImg.className = '';
  imgUploadPreviewImg.classList.add(newEffectClass);

  scaleControlValue.value = imageSettings.scale + '%';

  if (imageSettings.effect === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
};

applyImageSettings();


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

var isUniqueTags = function (tags) {
  for (var n = 0; n < tags.length; n++) {
    for (var j = n + 1; j < tags.length; j++) {
      if (tags[n].toUpperCase() === tags[j].toUpperCase()) {
        return false;
      }
    }
  }
  return true;
};

var hashtag = document.querySelector('.text__hashtags');
hashtag.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

hashtag.addEventListener('input', function () {
  var tags = hashtag.value.split(' ').filter(function (tag) {
    return tag !== '';
  });
  if (hashtag.value.length === 0) {
    hashtag.setCustomValidity('');
  }
  for (var y = 0; y < tags.length; y++) {
    var tag = tags[y];
    if (tag.length > 20) {
      hashtag.setCustomValidity('длина тега (' + tag + ') не может быть больше 20 символов');
      return;
    }
    if (tag[0] !== '#') {
      hashtag.setCustomValidity('тег (' + tag + ') должен начинаться с символа #');
      return;
    }
  }
  if (!tag.match(/^#[а-яА-Я0-9a-zA-Z]+$/)) {
    hashtag.setCustomValidity('тег (' + tag + ') должен cостоять из букв или цифр');
    return;
  }
  if (tags.length > 5) {
    hashtag.setCustomValidity('укажите не более 5 хештегов');
    return;
  }
  if (!isUniqueTags(tags)) {
    hashtag.setCustomValidity('уберите повторяющиеся хештеги');
    return;
  }
  hashtag.setCustomValidity('');
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
