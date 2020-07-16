'use strict';

(function () {
  window.loadData = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      var photos = JSON.parse(xhr.responseText);
      callback(photos);
    });
    xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
    xhr.send();
  };
  window.sendData = function (data, onSucess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSucess(xhr.response);
    });

    xhr.open('POST', ' https://javascript.pages.academy/kekstagram');
    xhr.send(data);

  };
  var er = 0;
  var form = document.querySelector('.img-upload__form');
  console.log(form);
  form.addEventListener('submit', function (evt) {
    if (er > 0) {
      window.sendData(new FormData(form), function (response) {
      // successTitleOpen();
      });
    } else {
      errorTitleOpen();
    }
    evt.preventDefault();

  //  window.applyImageSettings();
  });
  var successTitle = document.querySelector('main');
  var generateSuccessSend = function() {
    var template = document.querySelector('#success').content
     .querySelector('section');
    var successSend = template.cloneNode(true);
    return successSend;
  };

  var successTitleOpen = function() {
    successTitle.appendChild(generateSuccessSend());

    var successTitleClose = function () {
      successTitle.querySelector('.success').classList.add('hidden');
    };
    // successTitle.querySelector('.success__button').addEventListener('click', function() {
    document.addEventListener('click', function () {
      successTitleClose();
    });

    var successTitleCloseKey = function (evt) {
      if (evt.key === 'Escape') {
        successTitleClose();
      }
    };

    document.addEventListener('keydown', successTitleCloseKey);
  };

  successTitleOpen();

  var errorTitle = document.querySelector('main');
  var generateErrorSend = function() {
    var template = document.querySelector('#error').content
     .querySelector('section');
    var errorSend = template.cloneNode(true);
    return errorSend;
  };

  var errorTitleOpen = function() {
    errorTitle.appendChild(generateErrorSend());

    var errorTitleClose = function () {
      errorTitle.querySelector('.error').classList.add('hidden');
    };
    // successTitle.querySelector('.success__button').addEventListener('click', function() {
    document.addEventListener('click', function () {
      errorTitleClose();
    });

    var errorTitleCloseKey = function (evt) {
      if (evt.key === 'Escape') {
        errorTitleClose();
      }
    };

    document.addEventListener('keydown', errorTitleCloseKey);
  };

  var maxLengthDescription = 140;
  var description = document.querySelector('.img-upload__text').
  querySelector('textarea');
  description.addEventListener('input', function () {
    if (description.value.length > maxLengthDescription) {
      description.setCustomValidity('длина комментария не может быть больше 140 символов');
    } else {
      description.setCustomValidity('');
    }
  });
  // errorTitleOpen();

}());
