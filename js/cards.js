'use strict';

(function () {
  var rooms = ['комната', 'комнаты', 'комнат'];
  var guests = ['гостя', 'гостей', 'гостей'];

  var PhotoSize = {
    WIDTH: 45,
    HEIGHT: 40
  };

  var isCardOpened = false;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function Card(data) {
    this.author = data.author;
    this.offer = data.offer;
    this.element = null;
  }

  Card.prototype.create = function create() {
    this.element = cardTemplate.cloneNode(true);
    return this;
  };

  Card.prototype.fill = function fill() {
    this.element.querySelector('.popup__avatar').src = this.author.avatar;
    this.element.querySelector('.popup__title').textContent = this.offer.title;
    this.element.querySelector('.popup__text--address').textContent = this.offer.address;
    this.element.querySelector('.popup__text--price').textContent = this.offer.price + '₽/ночь';
    this.element.querySelector('.popup__type').textContent = window.utils.AccommodationType[this.offer.type.toUpperCase()].NAME;
    this.element.querySelector('.popup__text--capacity').textContent = this.offer.rooms + ' ' + window.utils.getPlural(rooms, this.offer.rooms) + ' для ' + this.offer.guests + ' ' + window.utils.getPlural(guests, this.offer.guests);
    this.element.querySelector('.popup__text--time').textContent = 'Заезд после ' + this.offer.checkin + ', выезд до ' + this.offer.checkout;
    this.element.querySelector('.popup__description').textContent = this.offer.description;
    this.element.querySelector('.popup__photo').remove();
    return this;
  };

  Card.prototype.setFeatures = function setFeatures() {
    var self = this;
    this.element.querySelectorAll('.popup__feature').forEach(function (feature) {
      var featureName = feature.classList[1].slice(feature.classList[1].indexOf('--') + 2);
      if (self.offer.features.indexOf(featureName) === -1) {
        feature.style.display = 'none';
      }
    });
    return this;
  };

  Card.prototype.setPhotos = function setPhotos() {
    var fragment = document.createDocumentFragment();
    this.offer.photos.forEach(function (url) {
      var photo = document.createElement('img');
      photo.src = url;
      photo.width = PhotoSize.WIDTH;
      photo.height = PhotoSize.HEIGHT;
      photo.alt = 'Фотография жилья';
      photo.classList.add('popup__photo');
      fragment.appendChild(photo);
    });
    this.element.querySelector('.popup__photos').appendChild(fragment);
    return this;
  };

  function setCard(card) {
    var cardElement = new Card(card);
    cardElement.create()
      .fill()
      .setFeatures()
      .setPhotos();
    return cardElement.element;
  }

  function onCloseButtonClick() {
    window.cards.clearCard();
  }

  function onCardEscPress(evt) {
    window.utils.isEscEvent(evt, window.cards.clearCard);
  }

  window.cards = {
    renderCard: function (offer) {
      var fragment = document.createDocumentFragment();
      var card = setCard(offer);
      fragment.appendChild(card);
      document.querySelector('.map').appendChild(fragment);
      isCardOpened = true;
      card.querySelector('.popup__close').addEventListener('click', onCloseButtonClick);
      window.addEventListener('keydown', onCardEscPress);
      return card;
    },
    clearCard: function () {
      window.removeEventListener('keydown', onCardEscPress);
      var active = document.querySelector('.map__pin--active');
      if (active) {
        active.blur();
        active.classList.remove('map__pin--active');
      }
      if (isCardOpened) {
        var card = document.querySelector('.map__card');
        card.remove();
        isCardOpened = false;
        card.querySelector('.popup__close').removeEventListener('click', onCloseButtonClick);
      }
    }
  };
})();
