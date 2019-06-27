'use strict';

(function () {
  var KeyCodes = {
    ESC: 27
  };

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCodes.ESC) {
        action();
      }
    },
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    formDisable: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
      }
    },
    formEnable: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = false;
      }
    }
  };
})();
