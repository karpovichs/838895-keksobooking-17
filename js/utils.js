'use strict';

(function () {
  window.utils = {
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    formDisable: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = true;
      }
    },
    formUndisable: function (element) {
      for (var i = 0; i < element.length; i++) {
        element[i].disabled = false;
      }
    }
  };
})();
