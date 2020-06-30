'use strict';

(function () {

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
