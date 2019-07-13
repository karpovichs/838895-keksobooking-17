'use strict';

(function () {
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

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
    this.element.style.left = this.location.x - PinSize.WIDTH / 2 + 'px';
    this.element.style.top = this.location.y - PinSize.HEIGHT + 'px';
    return this;
  };

  Pin.prototype.fill = function fill() {
    this.element.querySelector('img').src = this.author.avatar;
    this.element.querySelector('img').alt = this.offer.type;
    return this;
  };

  Pin.prototype.enable = function enable() {
    this.element.classList.add('map__pin--active');
  };

  function renderPin(offer) {
    var pin = new Pin(offer);

    pin.create()
      .place()
      .fill();

    function openCard() {
      window.cards.clearCard();
      pin.enable();
      window.cards.renderCard(offer);
    }

    function onPinClick() {
      openCard();
    }

    function onPinEnterPress(evt) {
      window.utils.isEnterEvent(evt, openCard);
    }

    pin.element.addEventListener('click', onPinClick);

    pin.element.addEventListener('keydown', onPinEnterPress);

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
      var list = document.querySelector('.map__pins');
      var pins = list.children;

      for (var i = pins.length - 1; i > 0; i--) {
        if (!pins[i].classList.contains('map__pin--main')) {
          pins[i].remove();
        }
      }
    }
  };
})();
