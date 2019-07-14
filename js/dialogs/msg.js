'use strict';

(function () {

  var EventDispatcher = window.utils.EventDispatcher;

  var Message = function (template) {
    this.main = document.querySelector('main');
    this.el = template.cloneNode(true);
    this.eventDispatcher = new EventDispatcher();
  };

  Message.prototype._initHandlers = function () {
    this.eventDispatcher.addEscKeyDownEventListener(
        document, this.close.bind(this)
    );
    this.eventDispatcher.addClickEventListener(
        document, this.close.bind(this)
    );
  };

  Message.prototype.open = function () {
    this.main.insertAdjacentElement('afterbegin', this.el);
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
