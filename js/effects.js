'use strict';

(function () {

  var effects = document.querySelector('.effects');
  effects.onValueChanged = null;
  effects.changeHandler = function (evt) {
    if (effects.onValueChanged !== null) {
      effects.onValueChanged(evt.target.value);
    }
  };

  effects.querySelectorAll('.effects__radio').forEach(function (r) {
    r.addEventListener('change', effects.changeHandler);
  });

})();
