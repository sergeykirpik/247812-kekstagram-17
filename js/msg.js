'use strict';

(function () {

  var Message = function (template) {
    this.el = template.cloneNode(true);
    this.eventDispatcher = new window.EventDispatcher();
  };

  Message.prototype._initHandlers = function () {
    var closeHandler = this.close.bind(this);
    this.eventDispatcher.addKeyEventListener(
        document, window.KeyEvents.KEY_ESC, closeHandler
    );
    this.eventDispatcher.addClickEventListener(
        document, closeHandler
    );
  };

  Message.prototype.open = function () {
    document.body.insertAdjacentElement('afterbegin', this.el);
    this._initHandlers();
  };

  Message.prototype.close = function () {
    this.el.remove();
    this.eventDispatcher.removeAllEventListeners();
  };

  var successTemplate = document.querySelector('#success')
    .content.querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content.querySelector('.error');

  var successInstance = new Message(successTemplate);
  var errorInstance = new Message(errorTemplate);

  window.msg = {
    success: Message.prototype.open.bind(successInstance),
    error: Message.prototype.open.bind(errorInstance),
  };

})();
