'use strict';

var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var OFFER_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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

map.classList.remove('map--faded');

for (var i = 0; i < OFFER_COUNT; i++) {
  fragment.appendChild(renderPin(similarOffers[i]));
}

pinList.appendChild(fragment);
