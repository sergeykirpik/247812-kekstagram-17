'use strict';

(function () {

  var noop = function () {};

  var ImgFilters = function (imgFiltersEl) {
    var thisImgFilters = this;

    this.el = imgFiltersEl;
    this.onButtonClicked = noop;

    this.buttons = imgFiltersEl.querySelectorAll('.img-filters__button');

    this.buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        thisImgFilters.setActive(b.id);
      });
    });
  }

  ImgFilters.prototype = {
    setActive: function (id) {
      var thisImgFilters = this;
      this.buttons.forEach(function (b) {
        if (b.id === id) {
          b.classList.add('img-filters__button--active');
          thisImgFilters.onButtonClicked(id);
        } else {
          b.classList.remove('img-filters__button--active');
        }
      });
    }
  };

  if (!window.components) {
    window.components = {};
  }
  window.components['ImgFilters'] = ImgFilters;
})();
