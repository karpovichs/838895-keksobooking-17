'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinList = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function Pin(data) {
    this.location = data.location;
    this.author = data.author;
    this.offer = data.offer;
    this.element = null;
  }

  Pin.prototype.create = function create() {
    this.element = pinTemplate.cloneNode(true);
    return this;
  };

  Pin.prototype.place = function place() {
    this.element.style.left = this.location.x - PIN_WIDTH / 2 + 'px';
    this.element.style.top = this.location.y - PIN_HEIGHT + 'px';
    return this;
  };

  Pin.prototype.fill = function fill() {
    this.element.querySelector('img').src = this.author.avatar;
    this.element.querySelector('img').alt = this.offer.type;
    return this;
  };

  Pin.prototype.disable = function disable() {
    this.element.classList.remove('map__pin--active');
    this.element.blur();
  };

  Pin.prototype.enable = function enable() {
    this.element.classList.add('map__pin--active');
  };

  function onPinEscPress(evt) {
    window.utils.isEscEvent(evt, window.cards.clearCard);
  }

  function renderPin(offer) {
    var pin = new Pin(offer);

    pin.create()
      .place()
      .fill();

    window.addEventListener('keydown', function (evt) {
      onPinEscPress(evt);
      pin.disable();
    });

    pin.element.addEventListener('click', function () {
      window.cards.clearCard();
      pin.enable();
      window.cards.renderCard(offer);
    });

    pin.element.addEventListener('keydown', function (evt) {
      window.utils.isEnterEvent(evt, function () {
        window.cards.clearCard();
        pin.enable();
        window.cards.renderCard(offer);
      });
    });

    return pin.element;
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
