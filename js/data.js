'use strict';

(function () {
  var generateComments = function (numberOfComments) {
    var comments = [];
    for (var i = 0; i < numberOfComments; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.generateRandomNumber(1, 6) + '.svg',
        message: window.COMMENT_MOCKS[window.generateRandomNumber(0, window.COMMENT_MOCKS.length - 1)],
        name: window.AUTHOR_MOCKS[window.generateRandomNumber(0, window.AUTHOR_MOCKS.length - 1)],
      });
    }
    return comments;
  };

  window.generatePhotos = function () {
    var photos = [];
    for (var i = 1; i < 26; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        description: 'описание',
        likes: window.generateRandomNumber(15, 200),
        comments: generateComments(window.generateRandomNumber(0, 4)),
      });
    }
    return photos;
  };

  window.generatePictureNode = function (pictureData) {
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
}());
