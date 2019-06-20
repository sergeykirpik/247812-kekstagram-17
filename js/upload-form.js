'use strict';

(function () {

  var KEY_ESC = 27;
  var KEY_ENTER = 13;

  var initDescription = function (el) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ESC) {
        evt.stopPropagation();
      }
    });
  };

  var initForm = function (el) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KEY_ENTER) {
        evt.preventDefault();
      }
    });
  };

  var form = document.querySelector('#upload-select-image');
  initForm(form);
  initDescription(form.description);
})();
