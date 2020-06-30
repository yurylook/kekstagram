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
}());
