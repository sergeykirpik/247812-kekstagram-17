'use strict';

(function () {
  var GET_LOADED_PHOTOS_URL = 'https://js.dump.academy/kekstagram/data';

  function noop() {}

  window.backend = {
    getPhotos: function (onSuccess, onError) {
      var loader = new window.xhr.Loader('GET', GET_LOADED_PHOTOS_URL);
      loader.onSuccess = onSuccess || noop;
      loader.onError = onError || noop;
      loader.onTimeout = function () {
        onSuccess(window.mockdata);
      };
      loader.send();
    }
  };
})();
