'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filterSelect = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('input[name=address]');
  var Limits = {
    TOP: 130 - MAIN_PIN_HEIGHT,
    RIGHT: map.offsetWidth - MAIN_PIN_WIDTH,
    BOTTOM: 630 - MAIN_PIN_HEIGHT,
    LEFT: 0
  };

  function pageActivate() {
    map.classList.remove('map--faded');

    var offersList = window.pin.createOfferArray();
    window.pin.renderPinList(offersList);

    adForm.classList.remove('ad-form--disabled');
    window.utils.formUndisable(formFieldset);
    window.utils.formUndisable(filterSelect);
  }

  function setPinCoordinates() {
    var coordinateX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var coordinateY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    adressInput.value = coordinateX + ', ' + coordinateY;
  }

  mainPin.addEventListener('mouseup', setPinCoordinates);
  mainPin.addEventListener('mouseup', pageActivate);
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.left = Math.max(Math.min((mainPin.offsetLeft - shift.x), Limits.RIGHT), Limits.LEFT) + 'px';
      mainPin.style.top = Math.max(Math.min((mainPin.offsetTop - shift.y), Limits.BOTTOM), Limits.TOP) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
