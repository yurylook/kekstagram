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

}());
