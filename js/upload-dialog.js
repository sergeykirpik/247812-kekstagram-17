'use strict';

(function () {

  var KeyEvents = window.KeyEvents;

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

  var UploadDialog = function () {
    var that = this;

    this.el = document.querySelector('.img-upload');

    var effectLevel = new EffectLevel(this.el.querySelector('.effect-level'));
    var effectsRadio = new EffectsRadioControl(this.el.querySelector('.effects'));
    var scale = new ScaleControl(this.el.querySelector('.scale'));
    var preview = new EffectsPreview(this.el.querySelector('.img-upload__preview'));

    effectLevel.onValueChanged = function (val) {
      preview.setEffectLevel(val);
    };

    effectsRadio.onValueChanged = function (val) {
      preview.setEffect(val);
      effectLevel.setValue(effectLevel.max);
      effectLevel.setVisible(val !== 'none');
    };

    scale.onValueChanged = function (val) {
      preview.setScale(val);
    };

    this.closeDialogEscKeyHandler = function (evt) {
      if (evt.keyCode === KeyEvents.KEY_ESC) {
        that.close();
      }
    };

    function initCloseBtn(dialog) {
      var btn = dialog.el.querySelector('.cancel');
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        dialog.close();
      });
      KeyEvents.addEnterKeyListener(btn, dialog.close.bind(dialog));
    }

    function initSubmitBtn(dialog) {
      var btn = dialog.el.querySelector('#upload-submit');
      btn.addEventListener('click', function () {
        dialog.submit();
      });
      KeyEvents.addEnterKeyListener(btn, dialog.submit.bind(dialog));
    }

    function initForm(dialog) {
      var form = dialog.el.querySelector('form');

      KeyEvents.addEnterKeyListener(form, function (evt) {
        evt.preventDefault();
      });

      KeyEvents.addEscKeyListener(form.description, function (evt) {
        evt.stopPropagation();
      });

      KeyEvents.addEscKeyListener(form.hashtags, function (evt) {
        evt.stopPropagation();
      });

      form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      return form;
    }

    this.onClose = null;
    this.overlay = this.el.querySelector('.img-upload__overlay');
    this.closeBtn = initCloseBtn(this);
    this.submitBtn = initSubmitBtn(this);
    this.form = initForm(this);
    this.effectLevel = effectLevel;
    this.effectsRadio = effectsRadio;
    this.scale = scale;
  };

  UploadDialog.prototype.open = function () {
    this.overlay.classList.remove('hidden');
    document.addEventListener('keydown', this.closeDialogEscKeyHandler);

    this.effectLevel.setValue(100);
    this.effectsRadio.setValue('none');
    this.scale.setValue(100);
  };

  UploadDialog.prototype.close = function () {
    this.overlay.classList.add('hidden');
    document.removeEventListener('keydown', this.closeDialogEscKeyHandler);
    if (this.onClose !== null) {
      this.onClose();
    }
  };

  UploadDialog.prototype.submit = function () {
    var self = this;

    var err = validateHashTags(this.form.hashtags.value);
    this.form.hashtags.setCustomValidity(err);

    if (err) {
      return;
    }
    window.backend.postNewPhoto(this.form,
        function () {
          self.close();
        }
    );
  };

  if (!window.dialogs) {
    window.dialogs = {};
  }
  window.dialogs.UploadDialog = UploadDialog;

})();
