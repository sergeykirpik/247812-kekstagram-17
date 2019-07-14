'use strict';

(function () {

  var DEFAULT_TIMEOUT = 500;

  window.debounce = function (callback, timeout) {
    var timeoutHandler;
    timeout = timeout || DEFAULT_TIMEOUT;
    return function () {
      var params = arguments;
      if (timeoutHandler) {
        clearTimeout(timeoutHandler);
      }
      timeoutHandler = setTimeout(function () {
        callback.apply(null, params);
      }, timeout);
    };
  };

})();
