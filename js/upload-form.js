'use strict';

(function () {

  var formElement = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  formElement.addEventListener('submit', function (evt) {
    window.sendData(new FormData(formElement), function () {
      window.onUploadOverlayClose();
      window.openSuccessMessage();
    }, function () {
      window.onUploadOverlayClose();
      window.openErrorMessage();
    });

    evt.preventDefault();
  });

  window.openSuccessMessage = function () {
    mainElement.appendChild(window.generateSuccessSendNode());

    var onCloseSuccessMessage = function () {
      mainElement.querySelector('.success').remove();
      mainElement.removeEventListener('click', onCloseSuccessMessage);
      document.removeEventListener('keydown', onSuccessMessageKeydown);
    };

    mainElement.addEventListener('click', onCloseSuccessMessage);

    var onSuccessMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        onCloseSuccessMessage();
      }
    };

    document.addEventListener('keydown', onSuccessMessageKeydown);
  };

  window.openErrorMessage = function () {
    mainElement.appendChild(window.generateErrorSendNode());

    var onCloseErrorMessage = function () {
      mainElement.querySelector('.error').remove();
      mainElement.removeEventListener('click', onCloseErrorMessage);
      document.removeEventListener('keydown', onErrorMessageKeydown);
    };

    mainElement.addEventListener('click', onCloseErrorMessage);

    var onErrorMessageKeydown = function (evt) {
      if (evt.key === 'Escape') {
        onCloseErrorMessage();
      }
    };

    document.addEventListener('keydown', onErrorMessageKeydown);
  };

})();
