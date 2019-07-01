'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function onPinEscPress(evt) {
    window.utils.isEscEvent(evt, window.cards.clearCard);
  }

  function renderPin(offer) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = offer.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = offer.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.type;

    window.addEventListener('keydown', function (evt) {
      onPinEscPress(evt);
      pinElement.classList.remove('map__pin--active');
    });

    pinElement.addEventListener('click', function () {
      window.cards.clearCard();
      window.cards.renderCard(offer);
      pinElement.classList.add('map__pin--active');
    });
    return pinElement;
  }

  window.pin = {
    renderPinList: function (offers) {
      var takeNumber = offers.length > 5 ? 5 : offers.length;
      for (var i = 0; i < takeNumber; i++) {
        if (offers[i].offer) {
          pinList.appendChild(renderPin(offers[i]));
        }
      }
    },
    clearPinList: function () {
      var pins = document.querySelectorAll('.map__pin');
      pins.forEach(function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          pin.remove();
        }
      });
    }
  };
})();
