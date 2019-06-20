'use strict';

(function () {

  var createModel = function (elem) {
    return {
      setValue: function (newValue) {
        elem.querySelectorAll('.effects__radio').forEach(function (r) {
          r.checked = r.value === newValue;
        });
        if (this.onValueChanged !== null) {
          this.onValueChanged(newValue);
        }
      },
    };
  };

  var initEffects = function (elem) {
    elem.model = createModel(elem);
    elem.model.onValueChanged = null;
    elem.model.changeHandler = function (model) {
      return function (evt) {
        if (model.onValueChanged !== null) {
          model.onValueChanged(evt.currentTarget.value);
        }
      };
    }(elem.model);

    elem.querySelectorAll('.effects__radio').forEach(function (r) {
      r.addEventListener('change', elem.model.changeHandler);
    });
  };

  initEffects(document.querySelector('.effects'));

})();
