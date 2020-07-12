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

  // var form = document.querySelector('.img-upload__form');
  // console.log(form);
  // form.addEventListener('submit', function (evt) {
  //  window.sendData(new FormData(form), function (response) {
  // document.querySelector('.img-upload__overlay').classList.add('hidden');
  //  });
  //  evt.preventDefault();
  // });

}());
