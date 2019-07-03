'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var MainPinDefault = {
    LEFT: '570px',
    TOP: '375px'
  };
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var filterSelect = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('input[name=address]');
  var isLoaded = false;
  var filterForm = map.querySelector('.map__filters');
  var typeFilter = filterForm.querySelector('#housing-type');
  var Limits = {
    TOP: 130 - MAIN_PIN_HEIGHT,
    RIGHT: map.offsetWidth - MAIN_PIN_WIDTH,
    BOTTOM: 630 - MAIN_PIN_HEIGHT,
    LEFT: 0
  };
  var offers = [];
  var resetButton = adForm.querySelector('.ad-form__reset');

  function Coordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  Coordinates.prototype.setCoordinates = function setCoordinates(x, y) {
    this.x = x;
    this.y = y;
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
    } else {
      window.pin.renderPinList(offers);
    }
    adForm.classList.remove('ad-form--disabled');
    window.utils.formEnable(formFieldset);
    window.utils.formEnable(filterSelect);
  }

  function setPinCoordinates() {
    var coordinateX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var coordinateY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    addressInput.value = coordinateX + ', ' + coordinateY;
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

  window.form.formReset();
  resetButton.addEventListener('click', function (){
    window.map.pageReset();
  });

  typeFilter.addEventListener('change', function () {
    window.utils.setDebounce(updatePinList);
  });

  mainPin.addEventListener('mouseup', setPinCoordinates);
  mainPin.addEventListener('mouseup', pageActivate);
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinates(evt.clientX, evt.clientY);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinates(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setCoordinates(moveEvt.clientX, moveEvt.clientY);

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

  window.map = {
    pageReset: function () {
      window.pin.clearPinList();
      window.cards.clearCard();
      map.classList.add('map--faded');
      adForm.reset();
      filterForm.reset();
      adForm.classList.add('ad-form--disabled');
      window.utils.formDisable(formFieldset);
      window.utils.formDisable(filterSelect);
      window.form.formReset();
      mainPin.style.left = MainPinDefault.LEFT;
      mainPin.style.top = MainPinDefault.TOP;
    }
  };
})();
