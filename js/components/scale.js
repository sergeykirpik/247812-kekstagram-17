'use strict';

(function () {

  var KeyEvents = window.KeyEvents;

  var DEFAULT_MIN = 25;
  var DEFAULT_MAX = 100;
  var DEFAULT_STEP = 25;

  function ScaleControl(el) {
    var that = this;

    this.min = DEFAULT_MIN;
    this.max = DEFAULT_MAX;
    this.onValueChanged = null;
    this.smallerControl = initSmallerControl();
    this.valueControl = el.querySelector('.scale__control--value');
    this.biggerControl = initBiggerControl();
    this.currentValue = DEFAULT_MAX;
    this.step = DEFAULT_STEP;

    function initSmallerControl() {
      var smallerControl = el.querySelector('.scale__control--smaller');
      smallerControl.addEventListener('click', function () {
        that.dec();
      });
      KeyEvents.addEnterKeyListener(smallerControl, that.dec.bind(that));
      return smallerControl;
    }

    function initBiggerControl() {
      var biggerControl = el.querySelector('.scale__control--bigger');
      biggerControl.addEventListener('click', function () {
        that.inc();
      });
      KeyEvents.addEnterKeyListener(biggerControl, that.inc.bind(that));
      return biggerControl;
    }
  }

  ScaleControl.prototype.setValue = function (val) {
    this.currentValue = Math.min(Math.max(val, this.min), this.max);
    this.valueControl.value = this.currentValue + '%';
    if (this.onValueChanged !== null) {
      this.onValueChanged(this.currentValue);
    }
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
