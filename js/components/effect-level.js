'use strict';

(function () {

  var KEY_RIGHT_ARROW = 39;
  var KEY_LEFT_ARROW = 37;

  var DEFAULT_MIN = 0;
  var DEFAULT_MAX = 100;

  function EffectLevel(el) {
    var that = this;

    this.onValueChanged = null;
    this.el = el;
    this.min = DEFAULT_MIN;
    this.max = DEFAULT_MAX;

    this.value = el.querySelector('.effect-level__value');
    this.line = el.querySelector('.effect-level__line');
    this.pin = initEffectLevelPin(this);
    this.depth = this.line.querySelector('.effect-level__depth');


    function documentMouseMoveHandler(evt) {
      that.setValue(that.calcValue(evt.clientX));
      evt.preventDefault();
    }

    function documentMouseUpHandler() {
      document.removeEventListener('mouseup', documentMouseUpHandler);
      document.removeEventListener('mousemove', documentMouseMoveHandler);
    }

    function initEffectLevelPin(effectLevel) {

      var pin = effectLevel.line.querySelector('.effect-level__pin');
      pin.addEventListener('mousedown', function () {
        document.addEventListener('mousemove', documentMouseMoveHandler);
        document.addEventListener('mouseup', documentMouseUpHandler);
      });

      pin.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KEY_RIGHT_ARROW) {
          effectLevel.setValue(effectLevel.getValue() + 1);

        } else if (evt.keyCode === KEY_LEFT_ARROW) {
          effectLevel.setValue(effectLevel.getValue() - 1);

        }
      });

      return pin;
    }

    this.el.addEventListener('click', function (evt) {
      that.setValue(that.calcValue(evt.clientX));
    });

  }

  EffectLevel.prototype.setValue = function (val) {
    val = Math.min(Math.max(val, this.min), this.max);
    this.value.value = val;
    this.pin.style.left = val + '%';
    this.depth.style.width = val + '%';

    if (this.onValueChanged !== null) {
      this.onValueChanged(val);
    }
  };

  EffectLevel.prototype.getValue = function () {
    return +this.value.value;
  };

  EffectLevel.prototype.calcValue = function (mouseX) {
    var rect = this.line.getBoundingClientRect();
    return Math.round((mouseX - rect.left) / rect.width * 100);
  };

  EffectLevel.prototype.setVisible = function (isVisible) {
    if (isVisible) {
      this.el.classList.remove('hidden');
    } else {
      this.el.classList.add('hidden');
    }
  };

  if (!window.components) {
    window.components = {};
  }
  window.components.EffectLevel = EffectLevel;

})();
