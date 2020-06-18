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

var onuploadOverlayKeydown = function (evt) {
  //  evt.preventDefault();
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

var imgUploadPreviewImg = document.querySelector('.img-upload__preview img');
var scaleControl = document.querySelectorAll('.scale__control');
var buttonControlSmaller = scaleControl[0];
var scaleControlValue = scaleControl[1].value;
var buttonControlBigger = scaleControl[2];
var value = 100;
var scalePersentage;
// console.log (scaleControlValue);
// scaleControl[1].value.innerText = value;
buttonControlSmaller.addEventListener('click', function () {
  if (25 < value && value <= 100) {
    value -= 25;
    scalePersentage = value / 100;
    imgUploadPreviewImg.style = 'transform: scale(' + scalePersentage + ');';
    scaleControlValue = value + '%';
    // console.log (scalePersentage, scaleControlValue);
    scaleControlValue.innerText = value + '%';
  }
});
// console.log(value);
buttonControlBigger.addEventListener('click', function () {
  if (25 <= value && value < 100) {
    value += 25;
    scalePersentage = value / 100;
    imgUploadPreviewImg.style = 'transform: scale(' + scalePersentage + ');';
    scaleControlValue = value + '%';
  // console.log (scalePersentage, scaleControlValue);
  }
});
// document.querySelector('.img-upload__preview img').style = 'filter: grayscale(0.9);';
// imgUploadPreviewImg.style = 'transform: scale(0.25);';
var hashtag = document.querySelector('.text__hashtags');
// console.log(hashtag.placeholder);
hashtag.placeholder.addEventListener('invalid', function () {
  // if (hashtag.validity.tooShort) {
  //  hashtag.setCustomValidity('хеш-тег не может состоять только из одной решётки');
  // }


});
