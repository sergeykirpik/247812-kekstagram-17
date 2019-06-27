'use strict';
(function () {

  var renderPicture = function (picture, pictureTemplate) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var generateDOM = function (pictures) {

    var fragment = document.createDocumentFragment();
    var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    pictures.forEach(function (picture) {
      fragment.appendChild(renderPicture(picture, pictureTemplate));
    });

    document.querySelector('.pictures').appendChild(fragment);
  };

  generateDOM(window.data.getData());


  var uploadDialog = new window.dialogs.UploadDialog();
  var uploadFile = document.querySelector('#upload-file');

  uploadFile.addEventListener('change', function () {
    uploadDialog.open();
  });

  uploadDialog.onClose = function () {
    uploadFile.value = '';
  };

})();
