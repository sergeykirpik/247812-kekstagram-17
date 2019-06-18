'use strict';

(function () {
  var KEY_ENTER = 13;

  var scale = document.querySelector('.scale');
  scale.onValueChanged = null;
  scale.smallerControl = scale.querySelector('.scale__control--smaller');
  scale.valueControl = scale.querySelector('.scale__control--value');
  scale.biggerControl = scale.querySelector('.scale__control--bigger');
  scale.currentValue = 0;
  scale.step = 25;
  scale.setValue = function (val) {
    scale.currentValue = Math.min(Math.max(val, 25), 100);
    scale.valueControl.value = scale.currentValue + '%';
    if (scale.onValueChanged !== null) {
      scale.onValueChanged(scale.currentValue);
    }
  };
  scale.inc = function () {
    scale.setValue(scale.currentValue + scale.step);
  };
  scale.dec = function () {
    scale.setValue(scale.currentValue - scale.step);
  };
  scale.smallerControl.addEventListener('click', function () {
    scale.dec();
  });
  scale.smallerControl.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      scale.dec();
    }
  });
  scale.biggerControl.addEventListener('click', function () {
    scale.inc();
  });
  scale.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_ENTER) {
      scale.inc();
    }
  });

})();
