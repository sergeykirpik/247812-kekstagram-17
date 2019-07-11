'use strict';

(function () {
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
    this.addEventListener(element, 'click', handler);
  };

  EventDispatcher.prototype.addKeyEventListener = function (element, keyCode, action) {
    var handler = function (evt) {
      if (evt.keyCode === keyCode) {
        action(evt);
      }
    };
    this.addEventListener(element, 'keydown', handler);
  };

  EventDispatcher.prototype.removeAllListeners = function () {
    this.events.forEach(function (e) {
      e.element.removeEventListener(e.eventType, e.handler);
    });
    this.events = [];
  };

  window.EventDispatcher = EventDispatcher;

})();
