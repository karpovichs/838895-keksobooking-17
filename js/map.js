'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 80;
  var MainPinDefault = {
    LEFT: '570px',
    TOP: '375px'
  };
  var Limit = {
    TOP: 130 - MAIN_PIN_HEIGHT,
    RIGHT: document.querySelector('.map').offsetWidth - MAIN_PIN_WIDTH,
    BOTTOM: 630 - MAIN_PIN_HEIGHT,
    LEFT: 0
  };
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('input[name=address]');
  var isLoaded = false;
  var isActivated = false;
  var offers = [];
  var resetButton = adForm.querySelector('.ad-form__reset');
  var filterForm = map.querySelector('.map__filters');
  var selects = filterForm.querySelectorAll('select');
  var features = filterForm.querySelectorAll('input[name="features"]');
  var filterNameMap = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests'
  };
  var state = {};

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
    filterFormEnable();
  }

  function onOffersError() {
    window.alerts.showError();
  }

  function pageActivate() {
    if (isActivated) {
      return;
    }

    setDefaultState(state);
    map.classList.remove('map--faded');
    if (!isLoaded) {
      window.backend.load(onOffersSuccess, onOffersError);
    } else {
      window.pin.renderPinList(offers);
      filterFormEnable();
    }
    window.form.formEnable();
    isActivated = true;
  }

  function setPinCoordinates() {
    var coordinateX = parseInt(mainPin.style.left, 10) - MAIN_PIN_WIDTH / 2;
    var coordinateY = parseInt(mainPin.style.top, 10) + MAIN_PIN_HEIGHT;
    addressInput.value = coordinateX + ', ' + coordinateY;
  }

  function setDefaultState(data) {
    data.type = window.filter.DEFAULT_VALUE;
    data.price = window.filter.DEFAULT_VALUE;
    data.rooms = window.filter.DEFAULT_VALUE;
    data.guests = window.filter.DEFAULT_VALUE;
    data.features = [];
  }

  function filterFormReset() {
    filterForm.reset();
    window.utils.formDisable(selects);
    window.utils.formDisable(features);
  }

  function filterFormEnable() {
    window.utils.formEnable(selects);
    window.utils.formEnable(features);
  }

  function updateState(key, value) {
    state[key] = value;
    return state;
  }

  function updatePinList() {
    window.pin.clearPinList();
    window.cards.clearCard();
    var filteredOffersList = window.filter.filterOffers(offers, state);
    window.pin.renderPinList(filteredOffersList);
  }

  function onFilterChange(key, value) {
    updateState(key, value);
    window.utils.setDebounce(updatePinList);
  }

  window.form.formReset();

  mainPin.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, function () {
      setPinCoordinates();
      pageActivate();
    });
  });
  mainPin.addEventListener('mouseup', setPinCoordinates);
  mainPin.addEventListener('mousedown', pageActivate);
  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = new Coordinates(evt.clientX, evt.clientY);

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinates(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setCoordinates(moveEvt.clientX, moveEvt.clientY);

      mainPin.style.left = Math.max(Math.min((mainPin.offsetLeft - shift.x), Limit.RIGHT), Limit.LEFT) + 'px';
      mainPin.style.top = Math.max(Math.min((mainPin.offsetTop - shift.y), Limit.BOTTOM), Limit.TOP) + 'px';
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  selects.forEach(function (select) {
    select.addEventListener('change', function () {
      var key = filterNameMap[select.name];
      var value = select.value;
      onFilterChange(key, value);
    });
  });

  features.forEach(function (feature) {
    feature.addEventListener('change', function () {
      var key = 'features';
      var value = state.features;
      if (feature.checked) {
        value.push(feature.value);
      } else {
        value.splice(value.indexOf(feature.value));
      }
      onFilterChange(key, value);
    });
  });

  resetButton.addEventListener('click', function () {
    window.map.pageReset();
  });

  window.map = {
    pageReset: function () {
      window.pin.clearPinList();
      window.cards.clearCard();
      map.classList.add('map--faded');
      filterFormReset();
      window.form.formReset();
      mainPin.style.left = MainPinDefault.LEFT;
      mainPin.style.top = MainPinDefault.TOP;
      isActivated = false;
    }
  };
})();
