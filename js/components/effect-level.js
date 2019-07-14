'use strict';

(function () {

  var DEFAULT_MIN = 0;
  var DEFAULT_MAX = 100;

  var KeyCode = window.constants.KeyCode;
  var EventType = window.constants.EventType;

  var noop = function () {};

  var EffectLevel = function (el) {

    this.onValueChanged = noop;
    this.el = el;
    this.min = DEFAULT_MIN;
    this.max = DEFAULT_MAX;

    this.value = el.querySelector('.effect-level__value');
    this.line = el.querySelector('.effect-level__line');
    this.pin = this.line.querySelector('.effect-level__pin');
    this.depth = this.line.querySelector('.effect-level__depth');

    this._addEventListeners();
  };

  EffectLevel.prototype._addEventListeners = function () {
    var self = this;

    this.el.addEventListener(EventType.CLICK, function (evt) {
      self.setValue(self.calcValue(evt.clientX));
    });

    var documentMouseMoveHandler = function (evt) {
      self.setValue(self.calcValue(evt.clientX));
      evt.preventDefault();
    };

    var documentMouseUpHandler = function () {
      document.removeEventListener(EventType.MOUSE_UP, documentMouseUpHandler);
      document.removeEventListener(EventType.MOUSE_MOVE, documentMouseMoveHandler);
    };

    this.pin.addEventListener(EventType.MOUSE_DOWN, function () {
      document.addEventListener(EventType.MOUSE_MOVE, documentMouseMoveHandler);
      document.addEventListener(EventType.MOUSE_UP, documentMouseUpHandler);
    });

    this.pin.addEventListener(EventType.KEY_DOWN, function (evt) {
      if (evt.keyCode === KeyCode.RIGHT_ARROW) {
        self.setValue(self.getValue() + 1);

      } else if (evt.keyCode === KeyCode.LEFT_ARROW) {
        self.setValue(self.getValue() - 1);

      }
    });
  };

  EffectLevel.prototype.setValue = function (val) {
    val = Math.min(Math.max(val, this.min), this.max);
    this.value.value = val;
    this.pin.style.left = val + '%';
    this.depth.style.width = val + '%';
    this.onValueChanged(val);
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
