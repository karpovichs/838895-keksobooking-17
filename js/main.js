'use strict';

var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var OFFER_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var AccomodationType = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function formDisable(element) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = true;
  }
}

function formUndisable(element) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = false;
  }
}

function pageActivate() {
  map.classList.remove('map--faded');

  for (var i = 0; i < OFFER_COUNT; i++) {
    fragment.appendChild(renderPin(similarOffers[i]));
  }
  pinList.appendChild(fragment);

  adForm.classList.remove('ad-form--disabled');

  formUndisable(formFieldset);
  formUndisable(filterSelect);
}

function setPinCoordinates() {
  var coordinateX = parseInt(mainPin.style.left, 10) - PIN_WIDTH / 2;
  var coordinateY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT;
  adressInput.value = coordinateX + ', ' + coordinateY;
}

function changeMinPrice() {
  priceInput.min = AccomodationType[typeSelect.value.toUpperCase()];
  priceInput.placeholder = AccomodationType[typeSelect.value.toUpperCase()];
}

function createOfferArray() {
  var offers = [];
  for (var i = 0; i < OFFER_COUNT; i++) {
    offers.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        type: OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length)],
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(130, 631)
      }
    });
  }
  return offers;
}

function renderPin(pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;
  return pinElement;
}

var map = document.querySelector('.map');
var mapWidth = map.clientWidth;
var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var similarOffers = createOfferArray();
var fragment = document.createDocumentFragment();
var mainPin = map.querySelector('.map__pin--main');
var filterSelect = document.querySelectorAll('.map__filter');
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');
var adressInput = adForm.querySelector('input[name=address]');
var typeSelect = adForm.querySelector('#type');
var priceInput = adForm.querySelector('input[name=price]');
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

formDisable(formFieldset);
formDisable(filterSelect);

adressInput.value = '545, 445';

mainPin.addEventListener('click', pageActivate);

mainPin.addEventListener('mouseup', setPinCoordinates);

typeSelect.addEventListener('change', changeMinPrice);

timeInSelect.addEventListener('change', function () {
  timeOutSelect.value = timeInSelect.value;
});
timeOutSelect.addEventListener('change', function () {
  timeInSelect.value = timeOutSelect.value;
});
