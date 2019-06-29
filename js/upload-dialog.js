'use strict';

(function () {

  var KeyEvents = window.KeyEvents;

  var EffectLevel = window.components.EffectLevel;
  var EffectsRadioControl = window.components.EffectsRadioControl;
  var ScaleControl = window.components.ScaleControl;
  var EffectsPreview = window.components.EffectsPreview;

  function UploadDialog() {
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
      btn.addEventListener('click', function () {
        dialog.close();
      });
      KeyEvents.addEnterKeyListener(btn, dialog.close.bind(dialog));
    }

    function initForm(dialog) {
      var form = dialog.el.querySelector('form');

      KeyEvents.addEnterKeyListener(form, function (evt) {
        evt.preventDefault();
      });

      KeyEvents.addEscKeyListener(form.description, function (evt) {
        evt.stopPropagation();
      });
    }

    this.onClose = null;
    this.overlay = this.el.querySelector('.img-upload__overlay');
    this.closeBtn = initCloseBtn(this);
    this.form = initForm(this);
    this.effectLevel = effectLevel;
    this.effectsRadio = effectsRadio;
    this.scale = scale;
  }

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

  if (!window.dialogs) {
    window.dialogs = {};
  }
  window.dialogs.UploadDialog = UploadDialog;

})();
