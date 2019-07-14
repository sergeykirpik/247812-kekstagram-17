'use strict';

(function () {

  var EventType = window.constants.EventType;
  var KeyCode = window.constants.KeyCode;

  var EventDispatcher = function () {
    this.events = [];
  };

  EventDispatcher.prototype.addEventListener = function (element, eventType, handler) {
    this.events.push({
      element: element,
      eventType: eventType,
      handler: handler
    });
    element.addEventListener(eventType, handler);
  };

  EventDispatcher.prototype.addClickEventListener = function (element, handler) {
    this.addEventListener(element, EventType.CLICK, handler);
  };

  EventDispatcher.prototype.addKeyDownEventListener = function (element, keyCode, action) {
    var handler = function (evt) {
      if (evt.keyCode === keyCode) {
        action(evt);
      }
    };
    this.addEventListener(element, EventType.KEY_DOWN, handler);
  };

  EventDispatcher.prototype.addEnterKeyDownEventListener = function (element, action) {
    this.addKeyDownEventListener(element, KeyCode.ENTER, action);
  };

  EventDispatcher.prototype.addEscKeyDownEventListener = function (element, action) {
    this.addKeyDownEventListener(element, KeyCode.ESC, action);
  };

  EventDispatcher.prototype.removeAllEventListeners = function () {
    this.events.forEach(function (e) {
      e.element.removeEventListener(e.eventType, e.handler);
    });
    this.events = [];
  };

  if (!window.utils) {
    window.utils = {};
  }
  window.utils.EventDispatcher = EventDispatcher;

})();
