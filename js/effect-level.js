'use strict';

(function () {

  var KEY_RIGHT_ARROW = 39;
  var KEY_LEFT_ARROW = 37;

  var DEFAULT_MIN = 0;
  var DEFAULT_MAX = 100;

  var createModel = function () {

    return {

      setValue: function (val) {
        val = Math.min(Math.max(val, this.min), this.max);
        this.value.value = val;
        this.pin.style.left = val + '%';
        this.depth.style.width = val + '%';

        if (this.onValueChanged !== null) {
          this.onValueChanged(val);
        }
      },

      getValue: function () {
        return +this.value.value;
      },

      calcValue: function calcValue(mouseX) {
        var rect = this.line.getBoundingClientRect();
        return Math.round((mouseX - rect.left) / rect.width * 100);
      },
    };
  };

  var initEffectLevelPin = function (elem, model) {
    elem.addEventListener('mousedown', function () {
      document.addEventListener('mousemove', model.documentMouseMoveHandler);
      document.addEventListener('mouseup', model.documentMouseUpHandler);
    });

    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_RIGHT_ARROW) {
        model.setValue(model.getValue() + 1);

      } else if (evt.keyCode === KEY_LEFT_ARROW) {
        model.setValue(model.getValue() - 1);

      }
    });
  };

  var initEffectLevel = function (elem) {

    elem.model = createModel();

    elem.model.documentMouseMoveHandler = function (model) {
      return function (evt) {
        model.setValue(model.calcValue(evt.clientX));
        evt.preventDefault();
      };
    }(elem.model);

    elem.model.documentMouseUpHandler = function (model) {
      return function () {
        document.removeEventListener('mouseup', model.documentMouseUpHandler);
        document.removeEventListener('mousemove', model.documentMouseMoveHandler);
      };
    }(elem.model);

    elem.model.onValueChanged = null;
    elem.model.min = DEFAULT_MIN;
    elem.model.max = DEFAULT_MAX;

    elem.model.value = elem.querySelector('.effect-level__value');
    elem.model.line = elem.querySelector('.effect-level__line');
    elem.model.pin = elem.model.line.querySelector('.effect-level__pin');
    elem.model.depth = elem.model.line.querySelector('.effect-level__depth');

    initEffectLevelPin(elem.model.pin, elem.model);

    elem.addEventListener('click', function (evt) {
      var model = evt.currentTarget.model;
      model.setValue(model.calcValue(evt.clientX));
    });
  };

  document.querySelectorAll('.effect-level').forEach(function (el) {
    initEffectLevel(el);
  });

})();
