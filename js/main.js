'use strict';
(function () {

  var loadedPhotos = null;

  var shuffleArray = function (array) {
    var arr = array.slice();
    arr.sort(function () {
      return Math.random() - 0.5;
    });
    return arr;
  };

  var FILTER_FUNCTIONS = {
    'filter-popular': function () {
      return loadedPhotos;
    },
    'filter-new': function () {
      return shuffleArray(loadedPhotos).slice(0, 10);
    },
    'filter-discussed': function () {
      var arr = loadedPhotos.slice();
      arr.sort(function (a, b) {
        var diff = b.comments.length - a.comments.length;
        if (diff !== 0) {
          return diff;
        }
        if (a.url < b.url) {
          return -1;
        }
        if (a.url > b.url) {
          return 1;
        }
        return 0;
      });
      return arr;
    }
  };

  var filterPhotos = function (id) {
    var filter = FILTER_FUNCTIONS[id];
    if (!filter) {
      throw new Error('Unknown filter: ' + id);
    }
    return filter(loadedPhotos);
  };

  var ImgFilters = window.components.ImgFilters;

  var renderPicture = function (picture, pictureTemplate) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var removeAllPictures = function (el) {
    el.querySelectorAll('.picture').forEach(function (pic) {
      pic.remove();
    });
  };

  var generateDOM = function (pictures) {
    if (!pictures) {
      return;
    }
    var fragment = document.createDocumentFragment();
    var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    pictures.forEach(function (picture) {
      fragment.appendChild(renderPicture(picture, pictureTemplate));
    });

    var picturesEl = document.querySelector('.pictures');
    removeAllPictures(picturesEl);
    picturesEl.appendChild(fragment);
  };


  var imgFilters = new ImgFilters(document.querySelector('.img-filters'));
  imgFilters.onButtonClicked = window.debounce(function (id) {
    generateDOM(filterPhotos(id));
  });
  imgFilters.setActive('filter-popular');

  window.backend.getPhotos(function (photos) {
    loadedPhotos = photos;
    generateDOM(loadedPhotos);
    imgFilters.el.classList.remove('img-filters--inactive');
  });

  var uploadDialog = new window.dialogs.UploadDialog();
  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function () {
    uploadDialog.open();
  });

  uploadDialog.onClose = function () {
    uploadFile.value = '';
  };

})();
