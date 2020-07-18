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

  window.sendData = function (data, onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return xhr.status === 200 ? onSucess() : onError();

    });

    xhr.open('POST', 'https://javascript.pages.academy/kekstagram');
    xhr.send(data);
  };

  var form = document.querySelector('.img-upload__form');
  form.addEventListener('submit', function (evt) {
    window.sendData(new FormData(form), function () {
      window.onUploadOverlayClose();
      successTitleOpen();
    }, function () {
      window.onUploadOverlayClose();
      errorTitleOpen();
    });

    evt.preventDefault();
  });
  var successTitle = document.querySelector('main');
  var generateSuccessSend = function () {
    var template = document.querySelector('#success').content
     .querySelector('section');
    var successSend = template.cloneNode(true);
    return successSend;

  };

  var successTitleOpen = function () {
    successTitle.appendChild(generateSuccessSend());

    var successTitleClose = function () {
      successTitle.querySelector('.success').remove();
    };

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

  var errorTitle = document.querySelector('main');
  var generateErrorSend = function () {
    var template = document.querySelector('#error').content
     .querySelector('section');
    var errorSend = template.cloneNode(true);
    return errorSend;
  };

  var errorTitleOpen = function () {
    errorTitle.appendChild(generateErrorSend());

    var errorTitleClose = function () {
      errorTitle.querySelector('.error').remove();
    };

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

}());
