'use strict';

(function () {

  var EventType = window.constants.EventType;

  var EventDispatcher = window.utils.EventDispatcher;

  var EffectLevel = window.components.EffectLevel;
  var EffectsRadioControl = window.components.EffectsRadioControl;
  var ScaleControl = window.components.ScaleControl;
  var EffectsPreview = window.components.EffectsPreview;

  var validateHashTags = function (value) {
    value = (value || '').trim();
    if (!value) {
      return '';
    }
    var hashtags = value
      .split(/\s+/)
      .map(function (it) {
        return it.toLowerCase();
      })
      .sort();

    for (var i = 0; i < hashtags.length; i++) {
      var it = hashtags[i];
      if (it[0] !== '#') {
        return 'Хэш-тег должен начинаться с символа # (решётка)';
      }
      if (it === '#') {
        return 'Хеш-тег не может состоять только из одной решётки';
      }
      if (it.lastIndexOf('#') !== 0) {
        return 'Хэш-теги должны разделяться пробелами';
      }
      if (it === hashtags[i + 1]) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }
      if (it.length > 20) {
        return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
      }
    }

    if (hashtags.length > 5) {
      return 'Нельзя указать больше пяти хэш-тегов';
    }

    return '';
  };

  var noop = function () {};

  var UploadDialog = function () {

    var dialog = this;

    this.eventDispatcher = new EventDispatcher();

    this.el = document.querySelector('.img-upload');

    var effectLevel = new EffectLevel(this.el.querySelector('.effect-level'));
    var effectsRadio = new EffectsRadioControl(this.el.querySelector('.effects'));
    var scale = new ScaleControl(this.el.querySelector('.scale'));

    effectLevel.onValueChanged = function (val) {
      dialog.preview.setEffectLevel(val);
    };

    effectsRadio.onValueChanged = function (val) {
      dialog.preview.setEffect(val);
      effectLevel.setValue(effectLevel.max);
      effectLevel.setVisible(val !== 'none');
    };

    scale.onValueChanged = function (val) {
      dialog.preview.setScale(val);
    };

    this.onClose = noop;
    this.overlay = this.el.querySelector('.img-upload__overlay');
    this.cancelBtn = this.el.querySelector('.cancel');
    this.submitBtn = this.el.querySelector('#upload-submit');
    this.form = this.el.querySelector('form');
    this.effectLevel = effectLevel;
    this.effectsRadio = effectsRadio;
    this.scale = scale;
    this.preview = new EffectsPreview(this.el.querySelector('.img-upload__preview'));

  };

  UploadDialog.prototype._addEventListeners = function () {
    var dialog = this;

    this.eventDispatcher.addClickEventListener(
        this.cancelBtn, function (evt) {
          evt.preventDefault();
          dialog.close();
        });
    this.eventDispatcher.addEnterKeyDownEventListener(
        this.cancelBtn, dialog.close.bind(dialog)
    );

    this.eventDispatcher.addClickEventListener(
        this.submitBtn, this.submit.bind(this)
    );
    this.eventDispatcher.addEnterKeyDownEventListener(
        this.submitBtn, this.submit.bind(dialog)
    );

    this.eventDispatcher.addEnterKeyDownEventListener(
        this.form, function (evt) {
          evt.preventDefault();
        });

    this.eventDispatcher.addEscKeyDownEventListener(
        this.form.description, function (evt) {
          evt.stopPropagation();
        });

    this.eventDispatcher.addEscKeyDownEventListener(
        this.form.hashtags, function (evt) {
          evt.stopPropagation();
        });

    this.eventDispatcher.addEventListener(
        this.form, EventType.SUBMIT, function (evt) {
          evt.preventDefault();
        });

    this.eventDispatcher.addEscKeyDownEventListener(
        document, this.close.bind(this)
    );
  };

  UploadDialog.prototype.open = function () {
    var dialog = this;

    this._addEventListeners();

    var file = document.querySelector('#upload-file').files[0];
    var fileReader = new FileReader();
    var img = this.preview.preview.querySelector('img');
    fileReader.addEventListener('load', function () {
      img.src = fileReader.result;
      dialog.overlay.classList.remove('hidden');
    });
    fileReader.readAsDataURL(file);

    this.effectLevel.setValue(100);
    this.effectsRadio.setValue('none');
    this.scale.setValue(100);
  };

  UploadDialog.prototype.close = function () {
    this.overlay.classList.add('hidden');
    this.eventDispatcher.removeAllEventListeners();
    this.form.hashtags.value = '';
    this.form.description.value = '';
    this.onClose();
  };

  UploadDialog.prototype.submit = function () {
    var dialog = this;

    var err = validateHashTags(this.form.hashtags.value);
    this.form.hashtags.setCustomValidity(err);

    if (err) {
      return;
    }
    window.backend.postNewPhoto(this.form,
        function () {
          dialog.close();
          window.msg.success();
        },
        function () {
          dialog.close();
          window.msg.error();
        }
    );
  };

  if (!window.dialogs) {
    window.dialogs = {};
  }
  window.dialogs.UploadDialog = UploadDialog;

})();
