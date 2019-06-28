'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(pin) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.type;
    return pinElement;
  }

  window.pin = {
    renderPinList: function (offers) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < offers.length - 1; i++) {
        if (offers[i].offer) {
          fragment.appendChild(renderPin(offers[i]));
        }
      }
      pinList.appendChild(fragment);
    }
  };
})();
