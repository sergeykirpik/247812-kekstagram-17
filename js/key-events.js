'use strict';

(function () {

  var KeyEvents = {};

  KeyEvents.KEY_ENTER = 13;
  KeyEvents.KEY_ESC = 27;
  KeyEvents.KEY_RIGHT_ARROW = 39;
  KeyEvents.KEY_LEFT_ARROW = 37;

  KeyEvents.addEnterKeyListener = function (el, action) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyEvents.KEY_ENTER) {
        action(evt);
      }
    });
  };

  KeyEvents.addEscKeyListener = function (el, action) {
    el.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyEvents.KEY_ESC) {
        action(evt);
      }
    });
  };

  window['KeyEvents'] = KeyEvents;
})();
