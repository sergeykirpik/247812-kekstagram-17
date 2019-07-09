'use strict';

(function () {

  var KeyEvents = window.KeyEvents;

  var EventType = {
    CLICK: 'click',
    KEYDOWN: 'keydown'
  };

  var eventListeners = [];

  var addEventListener = function (el, type, handler) {
    eventListeners.push({
      el: el,
      type: type,
      handler: handler
    });
    el.addEventListener(type, handler);
  };

  var removeAllEventListeners = function () {
    eventListeners.forEach(function (it) {
      it.el.removeEventListener(it.type, it.handler);
    });
    eventListeners = [];
  }

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

    this.cancelBtn = this.el.querySelector('.big-picture__cancel');
  };

  BigPictureDialog.prototype.show = function (picture) {
    if (picture) {
      this.setPicture(picture);
    }

    this.el.classList.remove('hidden');
    this.el.querySelector('.social__comment-count').classList.add('visually-hidden');
    this.el.querySelector('.comments-loader').classList.add('visually-hidden');

    this._addEventListeners();
  };

  BigPictureDialog.prototype.hide = function () {
    this.el.classList.add('hidden');
    this._removeAllEventListeners();
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

  BigPictureDialog.prototype._addEventListeners = function () {
    var self = this;

    addEventListener(this.cancelBtn, EventType.CLICK, this.hide.bind(this));
    addEventListener(document, EventType.KEYDOWN, function (evt) {
      if (KeyEvents.isEsc(evt)) {
        self.hide();
      }
    });
  };

  BigPictureDialog.prototype._removeAllEventListeners = function () {
    removeAllEventListeners();
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
