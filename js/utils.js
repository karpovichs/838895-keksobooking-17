'use strict';

(function () {
  var KeyCodes = {
    ESC: 27
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

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
    },
    getPlural: function (word, n) {
      var plural;
      if (n % 10 === 1 && n % 100 !== 11) {
        plural = 'one';
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        plural = 'few';
      } else {
        plural = 'many';
      }
      return word[plural];
    },
    setDebounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
