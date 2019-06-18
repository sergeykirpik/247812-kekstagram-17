'use strict';

(function () {

  var effects = document.querySelector('.effects');
  effects.onValueChanged = null;
  effects.changeHandler = function (evt) {
    if (effects.onValueChanged !== null) {
      effects.onValueChanged(evt.target.value);
    }
  };

  effects.setValue = function (newValue) {
    effects.querySelectorAll('.effects__radio').forEach(function (r) {
      r.checked = r.value === newValue;
    });
    if (effects.onValueChanged !== null) {
      effects.onValueChanged(newValue);
    }
  };

  effects.querySelectorAll('.effects__radio').forEach(function (r) {
    r.addEventListener('change', effects.changeHandler);
  });

})();
