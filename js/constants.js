'use strict';
(function () {
  window.constants = {};

  window.constants.KeyCode = {
    ENTER: 13,
    ESC: 27,
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37,
  };

  window.constants.EventType = {
    KEY_DOWN: 'keydown',
    KEY_UP: 'keyup',
    MOUSE_DOWN: 'mousedown',
    MOUSE_UP: 'mouseup',
    CLICK: 'click',
    MOUSE_MOVE: 'mousemove',
    SUBMIT: 'submit',
  };

  window.constants.HashTagsConstraint = {
    MAX_LENGTH: 20,
    MAX_COUNT: 5
  };

})();
