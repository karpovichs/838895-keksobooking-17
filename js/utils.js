'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.utils = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    },
    AccommodationType: {
      BUNGALO: {
        NAME: 'Бунгало',
        PRICE: 0
      },
      FLAT: {
        NAME: 'Квартира',
        PRICE: 1000
      },
      HOUSE: {
        NAME: 'Дом',
        PRICE: 5000
      },
      PALACE: {
        NAME: 'Дворец',
        PRICE: 10000
      }
    },
    formDisable: function (elements) {
      elements.forEach(function (element) {
        element.disabled = true;
      });
    },
    formEnable: function (elements) {
      elements.forEach(function (element) {
        element.disabled = false;
      });
    },
    getPlural: function (word, n) {
      var plural;
      if (n % 10 === 1 && n % 100 !== 11) {
        plural = 0;
      } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        plural = 1;
      } else {
        plural = 2;
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
