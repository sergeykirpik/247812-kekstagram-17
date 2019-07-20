'use strict';

(function () {
  var GET_LOADED_PHOTOS_URL = 'https://js.dump.academy/kekstagram/data';
  var POST_NEW_PHOTO_URL = 'https://js.dump.academy/kekstagram';

  var noop = function () {};

  window.backend = {
    getPhotos: function (onSuccess, onError) {
      var loader = new window.xhr.Loader('GET', GET_LOADED_PHOTOS_URL);
      loader.onSuccess = onSuccess || noop;
      loader.onError = onError || noop;
      loader.onTimeout = function () {
        onSuccess(window.mockdata);
      };
      loader.onConnectionError = function () {
        onSuccess(window.mockdata);
      };
      loader.send();
    },
    postNewPhoto: function (form, onSuccess, onError) {
      var loader = new window.xhr.Loader('POST', POST_NEW_PHOTO_URL);
      loader.onSuccess = onSuccess || noop;
      loader.onError = onError || noop;
      loader.send(new FormData(form));
    }
  };
})();
