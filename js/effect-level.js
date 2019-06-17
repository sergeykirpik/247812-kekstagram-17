'use strict';

(function () {

  var KEY_RIGHT_ARROW = 39;
  var KEY_LEFT_ARROW = 37;

  var initComponent = function (effectLevel) {
    effectLevel.onValueChanged = null;
    effectLevel.value = effectLevel.querySelector('.effect-level__value');
    effectLevel.line = effectLevel.querySelector('.effect-level__line');
    effectLevel.pin = effectLevel.line.querySelector('.effect-level__pin');
    effectLevel.depth = effectLevel.line.querySelector('.effect-level__depth');
    effectLevel.setValue = function (val) {
      val = Math.min(Math.max(val, 0), 100);
      effectLevel.value.value = val;
      effectLevel.pin.style.left = val + '%';
      effectLevel.depth.style.width = val + '%';

      if (effectLevel.onValueChanged !== null) {
        effectLevel.onValueChanged(val);
      }
    };
    effectLevel.getValue = function () {
      return +effectLevel.value.value;
    };
    effectLevel.calcValue = function (mouseX) {
      var rect = effectLevel.line.getBoundingClientRect();
      return Math.round((mouseX - rect.left) / rect.width * 100);
    };
    effectLevel.addEventListener('click', function (evt) {
      effectLevel.setValue(effectLevel.calcValue(evt.clientX));
    });
    effectLevel.pin.addEventListener('mousedown', function () {
      document.addEventListener('mousemove', effectLevel.documentMouseMoveHandler);
      document.addEventListener('mouseup', effectLevel.documentMouseUpHandler);
    });
    effectLevel.documentMouseMoveHandler = function (evt) {
      effectLevel.setValue(effectLevel.calcValue(evt.clientX));
      evt.preventDefault();
    };
    effectLevel.documentMouseUpHandler = function () {
      document.removeEventListener('mouseup', effectLevel.documentMouseUpHandler);
      document.removeEventListener('mousemove', effectLevel.documentMouseMoveHandler);
    };
    effectLevel.pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_RIGHT_ARROW) {
        effectLevel.setValue(effectLevel.getValue() + 1);

      } else if (evt.keyCode === KEY_LEFT_ARROW) {
        effectLevel.setValue(effectLevel.getValue() - 1);

      }
    });
  };

  document.querySelectorAll('.effect-level').forEach(function (el) {
    initComponent(el);
  });

})();
