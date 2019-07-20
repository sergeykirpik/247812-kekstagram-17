'use strict';

(function () {

  var EventDispatcher = window.utils.EventDispatcher;

  var COMMENTS_LIMIT = 5;

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var renderComment = function (comment, commentTemplate) {
    var el = commentTemplate.cloneNode(true);

    var n = getRandomInt(1, 6);
    el.querySelector('.social__picture').src = 'img/avatar-{{n}}.svg'.replace('{{n}}', n);
    el.querySelector('.social__picture').alt = comment.name;
    el.querySelector('.social__text').textContent = comment.message;

    return el;
  };

  var BigPictureDialog = function () {
    this.eventDispatcher = new EventDispatcher();
    this.el = document.querySelector('.big-picture');

    this.caption = this.el.querySelector('.social__caption');
    this.img = this.el.querySelector('.big-picture__img img');
    this.likesCount = this.el.querySelector('.likes-count');
    this.commentsCount = this.el.querySelector('.comments-count');
    this.commentsLoaded = this.el.querySelector('.comments-loaded');
    this.socialCommentsBlock = this.el.querySelector('.social__comments');
    this.commentTemplate = document.querySelector('#comment')
      .content
      .querySelector('.social__comment');

    this.cancelBtn = this.el.querySelector('.big-picture__cancel');
    this.commentsLoader = this.el.querySelector('.comments-loader');

  };

  BigPictureDialog.prototype._setCommentsLoaderVisibility = function (visible) {

    if (visible) {
      this.commentsLoader.classList.remove('visually-hidden');
    } else {
      this.commentsLoader.classList.add('visually-hidden');
    }
  };

  BigPictureDialog.prototype.show = function (picture) {
    if (picture) {
      this.setPicture(picture);
    }

    this.el.classList.remove('hidden');
    document.body.classList.add('modal-open');
    this._addEventListeners();
  };

  BigPictureDialog.prototype.hide = function () {
    this.el.classList.add('hidden');
    document.body.classList.remove('modal-open');
    this.eventDispatcher.removeAllEventListeners();
  };

  BigPictureDialog.prototype.setPicture = function (picture) {
    this.picture = picture;
    this.caption.textContent = picture.description;
    this.img.src = picture.url;
    this.likesCount.textContent = picture.likes;
    this.commentsCount.textContent = picture.comments.length;

    Array.from(this.socialCommentsBlock.children).forEach(function (it) {
      it.remove();
    });

    this.commentsLoadedCounter = 0;
    this._loadMoreComments();

  };

  BigPictureDialog.prototype._renderComments = function () {
    var fragment = document.createDocumentFragment();
    var start = this.commentsLoadedCounter;
    var end = this.commentsLoadedCounter + COMMENTS_LIMIT;
    var comments = this.picture.comments;
    for (var i = start; i < Math.min(comments.length, end); i++) {
      fragment.appendChild(renderComment(comments[i], this.commentTemplate));
    }

    this.socialCommentsBlock.appendChild(fragment);
    this.commentsLoaded.textContent = Math.min(comments.length, end);
  };

  BigPictureDialog.prototype._addEventListeners = function () {
    this.eventDispatcher.addClickEventListener(
        this.cancelBtn, this.hide.bind(this)
    );
    this.eventDispatcher.addEscKeyDownEventListener(
        document, this.hide.bind(this)
    );
    this.eventDispatcher.addClickEventListener(
        this.commentsLoader, this._loadMoreComments.bind(this)
    );
  };

  BigPictureDialog.prototype._loadMoreComments = function () {
    this._renderComments();
    this.commentsLoadedCounter += COMMENTS_LIMIT;
    this._setCommentsLoaderVisibility(
        this.commentsLoadedCounter < this.picture.comments.length
    );
  };

  BigPictureDialog._instance = new BigPictureDialog();
  BigPictureDialog.show = function (picture) {
    this._instance.show(picture);
  };

  if (!window.dialogs) {
    window.dialogs = {};
  }
  window.dialogs.BigPictureDialog = BigPictureDialog;

})();
