'use strict';

var xhr = new XMLHttpRequest();
// console.log(xhr.readyState);

xhr.addEventListener('load', function () {
  // console.log(xhr.responseText);
  // console.log(xhr.responseText.length);
  var array = xhr.responseText.split('url');
  // console.log(array.length);
  // console.log(array[1]);
  return array;
});
xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
// console.log(xhr.readyState);
xhr.send();
// console.log(xhr.readyState);
var bigPicture = document.querySelector('.big-picture overlay');
bigPicture.classList.remove('hidden');
