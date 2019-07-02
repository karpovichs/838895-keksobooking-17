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
  var isLoaded = false;
  var filterForm = map.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var offers = [];
  var Limits = {
    TOP: 130 - MAIN_PIN_HEIGHT,
    RIGHT: map.offsetWidth - MAIN_PIN_WIDTH,
    BOTTOM: 630 - MAIN_PIN_HEIGHT,
    LEFT: 0
  };

  function onOffersSuccess(data) {
    window.pin.renderPinList(data);
    isLoaded = true;
    offers = data;
  }

  function onOffersError() {
    window.alerts.showError();
  }

  function pageActivate() {
    map.classList.remove('map--faded');
    if (!isLoaded) {
      window.backend.load(onOffersSuccess, onOffersError);
    }
    adForm.classList.remove('ad-form--disabled');
    window.utils.formEnable(formFieldset);
    window.utils.formEnable(filterSelect);
  }

  function setPinCoordinates() {
    var coordinateX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var coordinateY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    adressInput.value = coordinateX + ', ' + coordinateY;
  }

  function offersFilter(filterName) {
    window.pin.clearPinList();
    var filteredOffers = offers.filter(function (offer) {
      return offer.offer.type === filterName;
    });
    window.pin.renderPinList(filteredOffers);
  }

  function updatePinList() {
    window.cards.clearCard();
    var selectedType = typeFilter.value;
    if (selectedType !== 'any') {
      offersFilter(selectedType);
    }
  }

  typeFilter.addEventListener('change', function () {
    window.utils.setDebounce(updatePinList);
  });

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
