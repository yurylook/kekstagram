'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/kekstagram/data';
  var URL_SEND = 'https://javascript.pages.academy/kekstagram';
  var MESSAGE_OF_SUCCESS = 200;
  window.loadData = function (callback) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      var photos = JSON.parse(xhr.responseText);
      callback(photos);
    });
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.sendData = function (data, onSucess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      return xhr.status === MESSAGE_OF_SUCCESS ? onSucess() : onError();

    });

    xhr.open('POST', URL_SEND);
    xhr.send(data);
  };

})();
