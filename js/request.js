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
      window.openSuccessMessage();
    }, function () {
      window.onUploadOverlayClose();
      window.openErrorMessage();
    });

    evt.preventDefault();
  });

  var mainElement = document.querySelector('main');

  window.openSuccessMessage = function () {
    mainElement.appendChild(window.generateSuccessSend());

    var onCloseSuccessMessage = function () {
      mainElement.querySelector('.success').remove();
      document.removeEventListener('click', onCloseSuccessMessage);
      document.removeEventListener('keydown', onSuccessMessageKeydown);
    };

    document.addEventListener('click', function () {
      onCloseSuccessMessage();
    });

    var onSuccessMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        onCloseSuccessMessage();
      }
    };

    document.addEventListener('keydown', onSuccessMessageKeydown);
  };

  window.openErrorMessage = function () {
    mainElement.appendChild(window.generateErrorSend());

    var onCloseErrorMessage = function () {
      mainElement.querySelector('.error').remove();
      document.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onErrorMessageKeydown);
    };

    document.addEventListener('click', function () {
      onCloseErrorMessage();
    });

    var onErrorMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        onCloseErrorMessage();
      }
    };

    document.addEventListener('keydown', onErrorMessageKeydown);
  };


}());
