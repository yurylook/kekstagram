'use strict';

(function () {

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

})();
