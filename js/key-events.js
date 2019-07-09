'use strict';

(function () {

  var KeyEvents = {
    KEY_ENTER: 13,
    KEY_ESC: 27,
    KEY_RIGHT_ARROW: 39,
    KEY_LEFT_ARROW: 37,
  };

  KeyEvents.isEnter = function (evt) {
    return evt.keyCode === KeyEvents.KEY_ENTER;
  };

  KeyEvents.isEsc = function (evt) {
    return evt.keyCode === KeyEvents.KEY_ESC;
  };

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
