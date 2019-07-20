'use strict';

(function () {

  var EventDispatcher = window.utils.EventDispatcher;

  var DEFAULT_MIN = 25;
  var DEFAULT_MAX = 100;
  var DEFAULT_STEP = 25;

  var noop = function () {};

  var ScaleControl = function (el) {

    this.eventDispatcher = new EventDispatcher();

    this.min = DEFAULT_MIN;
    this.max = DEFAULT_MAX;
    this.onValueChanged = noop;
    this.smallerControl = el.querySelector('.scale__control--smaller');
    this.valueControl = el.querySelector('.scale__control--value');
    this.biggerControl = el.querySelector('.scale__control--bigger');
    this.currentValue = DEFAULT_MAX;
    this.step = DEFAULT_STEP;

    this._addEventListeners();
  };

  ScaleControl.prototype._addEventListeners = function () {

    this.eventDispatcher.addClickEventListener(
        this.smallerControl, this.dec.bind(this)
    );
    this.eventDispatcher.addEnterKeyDownEventListener(
        this.smallerControl, this.dec.bind(this)
    );
    this.eventDispatcher.addClickEventListener(
        this.biggerControl, this.inc.bind(this)
    );
    this.eventDispatcher.addEnterKeyDownEventListener(
        this.biggerControl, this.inc.bind(self)
    );
  };

  ScaleControl.prototype.setValue = function (val) {
    this.currentValue = Math.min(Math.max(val, this.min), this.max);
    this.valueControl.value = this.currentValue + '%';
    this.onValueChanged(this.currentValue);
  };

  ScaleControl.prototype.inc = function () {
    this.setValue(this.currentValue + this.step);
  };

  ScaleControl.prototype.dec = function () {
    this.setValue(this.currentValue - this.step);
  };

  if (!window.components) {
    window.components = {};
  }
  window.components.ScaleControl = ScaleControl;

})();
