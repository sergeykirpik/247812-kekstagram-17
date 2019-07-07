'use strict';

(function () {
  var DEFAULT_XHR_TIMEOUT = 5000;

  function noop() {}

  function Loader(method, url) {
    var loader = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = DEFAULT_XHR_TIMEOUT;
    xhr.open(method, url);
    this.onSuccess = noop;
    this.onError = noop;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var data = null;
        try {
          data = JSON.parse(xhr.responseText);
        } catch (err) {
          loader.onError('Плохой формат ответа сервера: ' + err);
        }
        loader.onSuccess(data);
      } else {
        loader.onError('Ошибка с кодом ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      loader.onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      loader.onError('Таймаут соединения');
    });
    this.xhr = xhr;
  }
  Loader.prototype.send = function (body) {
    this.xhr.send(body);
  };

  window.xhr = {
    Loader: Loader
  };

})();
