'use strict';

(function () {
  window.generateRandomNumber = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  window.getFilterStyle = function (newEffect, persentage) {
    if (newEffect === 'none') {
      return '';
    }
    if (newEffect === 'chrome') {
      return 'filter: grayscale(' + persentage + ');';
    }
    if (newEffect === 'sepia') {
      return 'filter: sepia(' + persentage + ');';
    }
    if (newEffect === 'marvin') {
      return 'filter: invert(' + persentage * 100 + '%);';
    }
    if (newEffect === 'phobos') {
      return 'filter: blur(' + (1 + persentage * 2) + 'px);';
    }
    if (newEffect === 'heat') {
      return 'filter: brightness(' + persentage * 3 + ');';
    }
    return newEffect;
  };

  var isUniqueArray = function (tags) {
    for (var n = 0; n < tags.length; n++) {
      for (var j = n + 1; j < tags.length; j++) {
        if (tags[n].toUpperCase() === tags[j].toUpperCase()) {
          return false;
        }
      }
    }
    return true;
  };

  window.getValidationMessageError = function (tags) {
    if (tags.length === 0) {
      return '';
    }
    for (var y = 0; y < tags.length; y++) {
      var tag = tags[y];
      if (tag.length > 20) {
        return 'длина тега (' + tag + ') не может быть больше 20 символов';
      }
      if (tag[0] !== '#') {
        return 'тег (' + tag + ') должен начинаться с символа #';
      }
      if (!tag.match(/^#[а-яА-Я0-9a-zA-Z]+$/)) {
        return 'тег (' + tag + ') должен cостоять из букв или цифр';
      }
    }
    if (tags.length > 5) {
      return 'укажите не более 5 хештегов';
    }
    if (!isUniqueArray(tags)) {
      return ('уберите повторяющиеся хештеги');
    }
    return '';
  };

  window.clip = function (value, minValue, maxValue) {
    return Math.max(minValue, Math.min(maxValue, value));
  };

}());
