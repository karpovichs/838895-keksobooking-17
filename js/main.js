'use strict';

var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var OFFER_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Создание массива со случайным порядком чисел от 1 до OFFER_COUNT для аватара
function createNumberArray() {
  var number;
  var used = {};
  var numArray = [];

  for (var i = 0; i < OFFER_COUNT; i++) {
    number = getRandomNumber(1, OFFER_COUNT + 1);
    while (used[number]) {
      number = getRandomNumber(1, OFFER_COUNT + 1);
    }
    used[number] = true;
    numArray.push(number);
  }
  return numArray;
}

function createOfferArray() {
  var avatars = createNumberArray();
  var offers = [];
  for (var i = 0; i < OFFER_COUNT; i++) {
    offers[i] = {
      author: {
        avatar: 'img/avatars/user0' + avatars[i] + '.png'
      },
      offer: {
        type: OFFER_TYPES[getRandomNumber(0, OFFER_TYPES.length)],
      },
      location: {
        x: (getRandomNumber(PIN_WIDTH / 2, mapWidth - PIN_WIDTH) - PIN_WIDTH / 2) + 'px',
        y: getRandomNumber(130, 631) - PIN_HEIGHT + 'px'
      }
    };
  }
  return offers;
}

function renderPin(pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = pin.location.x;
  pinElement.style.top = pin.location.y;
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
