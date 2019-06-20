'use strict';

(function () {

  var effectFunctions = {
    chrome: function (level) {
      return 'grayscale(' + level * 0.01 + ')';
    },
    sepia: function (level) {
      return 'sepia(' + level * 0.01 + ')';
    },
    marvin: function (level) {
      return 'invert(' + level + '%)';
    },
    phobos: function (level) {
      return 'blur(' + Math.round(level * 0.03) + 'px';
    },
    heat: function (level) {
      return 'brightness(' + level * 0.03 + ')';
    },
    none: function () {
      return '';
    },
  };

  var createModel = function (elem) {
    return {
      setEffectLevel: function (lvl) {
        elem.style.filter = effectFunctions[this.currentEffect](lvl);
      },
      setEffect: function (effect) {
        this.currentEffect = effect;
        elem.className = 'img-upload__preview effects__preview--' + effect;
      },
      setScale: function (val) {
        elem.querySelector('img').style.transform = 'scale(' + val * 0.01 + ')';
      },
    };
  };

  var initPreview = function (elem) {
    elem.model = createModel(elem);
  };

  initPreview(document.querySelector('.img-upload__preview'));

})();
