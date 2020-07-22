'use strict';

(function () {

  window.generatePictureNode = function (pictureData, index) {
    var template = document
      .querySelector('#picture')
      .content
      .querySelector('a');

    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureData.url;
    pictureElement.querySelector('.picture__img').setAttribute('data-id', index);
    pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
    pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;

    return pictureElement;
  };

  window.generateErrorSend = function () {
    var template = document.querySelector('#error').content
     .querySelector('section');
    var errorSend = template.cloneNode(true);
    return errorSend;
  };

  window.generateSuccessSend = function () {
    var template = document.querySelector('#success').content
     .querySelector('section');
    var successSend = template.cloneNode(true);
    return successSend;
  };

})();
