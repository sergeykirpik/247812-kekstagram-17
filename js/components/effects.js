'use strict';

(function () {

  var EffectsRadioControl = function (el) {
    var that = this;

    var changeHandler = function (evt) {
      if (that.onValueChanged !== null) {
        that.onValueChanged(evt.currentTarget.value);
      }
    };

    this.radios = el.querySelectorAll('.effects__radio');

    this.radios.forEach(function (r) {
      r.addEventListener('change', changeHandler);
    });

    this.onValueChanged = null;
  };

  EffectsRadioControl.prototype.setValue = function (newValue) {
    this.radios.forEach(function (r) {
      r.checked = r.value === newValue;
    });
    if (this.onValueChanged !== null) {
      this.onValueChanged(newValue);
    }
  };

  if (!window.components) {
    window.components = {};
  }
  window.components.EffectsRadioControl = EffectsRadioControl;

})();
