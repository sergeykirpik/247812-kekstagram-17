'use strict';

(function () {
  var KEY_ENTER = 13;

  var DEFAULT_MIN = 25;
  var DEFAULT_MAX = 100;
  var DEFAULT_STEP = 25;

  var createModel = function () {
    return {
      setValue: function (val) {
        this.currentValue = Math.min(Math.max(val, this.min), this.max);
        this.valueControl.value = this.currentValue + '%';
        if (this.onValueChanged !== null) {
          this.onValueChanged(this.currentValue);
        }
      },
      inc: function () {
        this.setValue(this.currentValue + this.step);
      },
      dec: function () {
        this.setValue(this.currentValue - this.step);
      },
    };
  };

  var initSmallerControl = function (elem, model) {
    elem.addEventListener('click', function () {
      model.dec();
    });
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ENTER) {
        model.dec();
      }
    });
  };

  var initBiggerControl = function (elem, model) {
    elem.addEventListener('click', function () {
      model.inc();
    });
    elem.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ENTER) {
        model.inc();
      }
    });
  };

  var initScale = function (elem) {
    elem.model = createModel();
    elem.model.min = DEFAULT_MIN;
    elem.model.max = DEFAULT_MAX;
    elem.model.onValueChanged = null;
    elem.model.smallerControl = elem.querySelector('.scale__control--smaller');
    elem.model.valueControl = elem.querySelector('.scale__control--value');
    elem.model.biggerControl = elem.querySelector('.scale__control--bigger');
    elem.model.currentValue = 0;
    elem.model.step = DEFAULT_STEP;

    initSmallerControl(elem.model.smallerControl, elem.model);
    initBiggerControl(elem.model.biggerControl, elem.model);
  };

  initScale(document.querySelector('.scale'));

})();
