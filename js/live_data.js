'use strict';

(function () {

  function getData() {
    return null;
  }

  if (!window.data) {
    window.data = {};
  }
  window.data.getData = getData;

})();
