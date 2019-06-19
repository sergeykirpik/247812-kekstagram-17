'use strict';

(function () {

  var KEY_ESC = 27;
  var KEY_ENTER = 13;

  var initOverlay = function (overlay) {

    overlay.documentEscKeyDownHandler = function (evt) {
      if (evt.keyCode === KEY_ESC) {
        overlay.close();
      }
    };

    overlay.open = function () {
      this.classList.remove('hidden');
      document.addEventListener('keydown', this.documentEscKeyDownHandler);
      this.effects.model.setValue('none');
      this.effectLevel.model.setValue(100);
      this.scale.model.setValue(100);
    };

    overlay.close = function () {
      this.classList.add('hidden');
      document.removeEventListener('keydown', this.documentEscKeyDownHandler);
      this.file.value = '';
    };

    var effects = overlay.querySelector('.effects');
    var effectLevel = overlay.querySelector('.effect-level');
    var scale = overlay.querySelector('.scale');
    var preview = overlay.querySelector('.img-upload__preview');

    overlay.effects = effects;
    overlay.effectLevel = effectLevel;
    overlay.scale = scale;

    overlay.file = document.querySelector('#upload-file');
    overlay.file.addEventListener('change', function () {
      overlay.open();
    });

    effects.model.onValueChanged = function (effect) {
      preview.model.setEffect(effect);
      effectLevel.model.setValue(100);
      if (effect === 'none') {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }
    };

    effectLevel.model.onValueChanged = function (level) {
      preview.model.setEffectLevel(level);
    };

    scale.model.onValueChanged = function (val) {
      preview.model.setScale(val);
    };

  };

  var overlay = document.querySelector('.img-upload__overlay');
  initOverlay(overlay);
  var uploadCancel = overlay.querySelector('.img-upload__cancel');
  uploadCancel.addEventListener('click', function () {
    overlay.close();
  });
  uploadCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      overlay.close();
    }
  });

})();
