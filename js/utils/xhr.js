'use strict';

(function () {
  var DEFAULT_XHR_TIMEOUT = 5000;

  var noop = function () {};

  var Loader = function (method, url) {
    var loader = this;
    var xhr = new XMLHttpRequest();
    xhr.timeout = DEFAULT_XHR_TIMEOUT;
    xhr.open(method, url);
    this.onSuccess = noop;
    this.onError = noop;
    this.onTimeout = null;
    this.onConnectionError = null;

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
      if (loader.onConnectionError) {
        loader.onConnectionError();
      } else {
        loader.onError('Ошибка соединения');
      }
    });

    xhr.addEventListener('timeout', function () {
      if (loader.onTimeout) {
        loader.onTimeout();
      } else {
        loader.onError('Таймаут соединения');
      }
    });
    this.xhr = xhr;
  };

  Loader.prototype.send = function (body) {
    this.xhr.send(body);
  };

  window.xhr = {
    Loader: Loader
  };

})();
