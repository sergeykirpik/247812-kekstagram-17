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
      return 'brightness(' + (level * 0.02 + 1.0) + ')';
    },
    none: function () {
      return '';
    },
  };

  var getEffectFunction = function (effect) {
    var func = effectFunctions[effect];
    if (!func) {
      throw new Error('Invalid effect function: ' + effect);
    }
    return func;
  };

  var EffectsPreview = function (el) {
    this.preview = el;
    this.currentEffect = getEffectFunction('none');
  };

  EffectsPreview.prototype.setEffectLevel = function (lvl) {
    this.preview.style.filter = this.currentEffect(lvl);
  };

  EffectsPreview.prototype.setEffect = function (effect) {
    this.currentEffect = getEffectFunction(effect);
    this.preview.className = 'img-upload__preview effects__preview--' + effect;
  };

  EffectsPreview.prototype.setScale = function (val) {
    this.preview.querySelector('img').style.transform = 'scale(' + val * 0.01 + ')';
  };

  if (!window.components) {
    window.components = {};
  }
  window.components.EffectsPreview = EffectsPreview;

})();
