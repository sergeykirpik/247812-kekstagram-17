'use strict';

(function () {

  var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.randomInt = randomInt;

  var renderComment = function (comment, commentTemplate) {
    var el = commentTemplate.cloneNode(true);

    var n = randomInt(1, 6);
    el.querySelector('.social__picture').src = 'img/avatar-{{n}}.svg'.replace('{{n}}', n);
    el.querySelector('.social__text').textContent = comment.message;

    return el;
  };

  var BigPictureDialog = function () {
    this.el = document.querySelector('.big-picture');

    this.caption = this.el.querySelector('.social__caption');
    this.img = this.el.querySelector('.big-picture__img img');
    this.likesCount = this.el.querySelector('.likes-count');
    this.commentsCount = this.el.querySelector('.comments-count');
    this.socialCommentsBlock = this.el.querySelector('.social__comments');
    this.commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

  };

  BigPictureDialog.prototype.show = function (picture) {
    if (picture) {
      this.setPicture(picture);
    }

    this.el.classList.remove('hidden');
    this.el.querySelector('.social__comment-count').classList.add('visually-hidden');
    this.el.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  BigPictureDialog.prototype.setPicture = function (picture) {
    this.caption.textContent = picture.description;
    this.img.src = picture.url;
    this.likesCount.textContent = picture.likes;
    this.commentsCount.textContent = picture.comments.length;

    var fragment = document.createDocumentFragment();
    var commentTemplate = this.commentTemplate;
    picture.comments.forEach(function (it) {
      fragment.appendChild(renderComment(it, commentTemplate));
    });

    Array.from(this.socialCommentsBlock.children).forEach(function (it) {
      it.remove();
    });
    this.socialCommentsBlock.appendChild(fragment);

  };

  if (!window.dialogs) {
    window.dialogs = {};
  }
  window.dialogs.BigPictureDialog = BigPictureDialog;

})();
