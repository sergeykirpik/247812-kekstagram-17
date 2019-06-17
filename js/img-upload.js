'use strict';

(function () {

  var overlay = document.querySelector('.img-upload__overlay');
  overlay.classList.remove('hidden');

  var preview = overlay.querySelector('.img-upload__preview');
  preview.setEffect = function (effect, level) {
    preview.currentEffect = effect;
    preview.className = 'img-upload__preview effects__preview--' + effect;

    switch (effect) {
      case 'chrome':
        preview.style.filter = 'grayscale(' + level * 0.01 + ')';
        break;
      case 'sepia':
        preview.style.filter = 'sepia(' + level * 0.01 + ')';
        break;
      case 'marvin':
        preview.style.filter = 'invert(' + level + '%)';
        break;
      case 'phobos':
        preview.style.filter = 'blur(' + Math.round(level * 0.03) + 'px';
        break;
      case 'heat':
        preview.style.filter = 'brightness(' + level * 0.03 + ')';
        break;
      case 'none':
        preview.style.filter = '';
        break;
      default:
        throw Error('Unknown effect: ' + effect);
    }
  };

  overlay.effectLevel = overlay.querySelector('.img-upload__effect-level');

  overlay.querySelector('.effects').onValueChanged = function (effect) {
    if (effect === 'none') {
      overlay.effectLevel.classList.add('hidden');
    } else {
      overlay.effectLevel.classList.remove('hidden');
    }
    preview.setEffect(effect, 100);
    overlay.effectLevel.setValue(100);
  };

  overlay.effectLevel.onValueChanged = function (value) {
    preview.setEffect(preview.currentEffect, value);
  };

  preview.setEffect('heat', 100);
  overlay.effectLevel.setValue(100);

})();
