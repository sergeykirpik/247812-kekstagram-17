'use strict';

(function () {

  var KEY_ESC = 27;

  var imgUpload = document.querySelector('.img-upload');
  imgUpload.file = imgUpload.querySelector('#upload-file');
  imgUpload.file.value = '';
  imgUpload.file.addEventListener('change', function () {
    imgUpload.overlay.open();
  });

  var overlay = document.querySelector('.img-upload__overlay');
  imgUpload.overlay = overlay;
  overlay.open = function () {
    overlay.effects.setValue('none');
    overlay.scale.setValue(100);
    overlay.effectLevel.setValue(100);
    overlay.classList.remove('hidden');
    document.addEventListener('keydown', overlay.keyEscDownHandler);
  };
  overlay.close = function () {
    imgUpload.file.value = '';
    overlay.classList.add('hidden');
    document.removeEventListener('keydown', overlay.keyEscDownHandler);
  };

  overlay.keyEscDownHandler = function (evt) {
    if (evt.keyCode === KEY_ESC) {
      overlay.close();
    }
  };

  overlay.uploadCancel = overlay.querySelector('.img-upload__cancel');
  overlay.uploadCancel.addEventListener('click', function () {
    overlay.close();
  });

  var preview = overlay.querySelector('.img-upload__preview');
  preview.effectFunctions = {
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
  preview.setEffectLevel = function (lvl) {
    preview.style.filter = preview.effectFunctions[preview.currentEffect](lvl);
  };

  preview.setEffect = function (effect) {
    preview.currentEffect = effect;
    preview.className = 'img-upload__preview effects__preview--' + effect;
  };

  overlay.effects = overlay.querySelector('.effects');
  overlay.effects.onValueChanged = function (effect) {
    if (effect === 'none') {
      overlay.effectLevel.classList.add('hidden');
    } else {
      overlay.effectLevel.classList.remove('hidden');
    }
    preview.setEffect(effect);
    overlay.effectLevel.setValue(100);
  };

  overlay.effectLevel = overlay.querySelector('.img-upload__effect-level');
  overlay.effectLevel.onValueChanged = function (value) {
    preview.setEffectLevel(value);
  };

  overlay.scale = overlay.querySelector('.scale');
  overlay.scale.onValueChanged = function (val) {
    preview.querySelector('img').style.transform = 'scale(' + val * 0.01 + ')';
  };

})();
