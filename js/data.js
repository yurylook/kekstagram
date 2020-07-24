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

  window.generateErrorSendNode = function () {
    var template = document.querySelector('#error').content
     .querySelector('section');
    var errorSend = template.cloneNode(true);
    return errorSend;
  };

  window.generateSuccessSendNode = function () {
    var template = document.querySelector('#success').content
     .querySelector('section');
    var successSend = template.cloneNode(true);
    return successSend;
  };

  window.generateSocialCommentNode = function (comment) {
    var template = document.querySelector('#social_comment_template').content;
    var socialCommentElement = template.cloneNode(true);
    var socialCommentImageElement = socialCommentElement.querySelector('img');
    socialCommentImageElement.src = comment.avatar;
    socialCommentImageElement.alt = comment.name;
    socialCommentElement.querySelector('.social__text').innerText = comment.message;
    return socialCommentElement;
  };

})();
