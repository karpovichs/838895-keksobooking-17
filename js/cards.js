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
    this.element.querySelector('.popup__title').innerHTML = this.offer.title;
    this.element.querySelector('.popup__text--address').innerHTML = this.offer.address;
    this.element.querySelector('.popup__text--price').innerHTML = this.offer.price + '&#x20bd;/ночь';
    this.element.querySelector('.popup__type').innerHTML = window.utils.AccommodationType[this.offer.type.toUpperCase()].NAME;
    this.element.querySelector('.popup__text--capacity').innerHTML = this.offer.rooms + ' ' + window.utils.getPlural(rooms, this.offer.rooms) + ' для ' + this.offer.guests + ' ' + window.utils.getPlural(guests, this.offer.guests);
    this.element.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + this.offer.checkin + ', выезд до ' + this.offer.checkout;
    this.element.querySelector('.popup__description').innerHTML = this.offer.description;
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

  Card.prototype.addCloseListener = function addCloseListener() {
    this.element.querySelector('.popup__close').addEventListener('click', function () {
      window.cards.clearCard();
    });
  };

  function setCard(card) {
    var cardElement = new Card(card);
    cardElement.create()
      .fill()
      .setFeatures()
      .setPhotos()
      .addCloseListener();
    return cardElement.element;
  }

  window.cards = {
    renderCard: function (offer) {
      var fragment = document.createDocumentFragment();
      var card = setCard(offer);
      fragment.appendChild(card);
      document.querySelector('.map').appendChild(fragment);
      isCardOpened = true;
      return card;
    },
    clearCard: function () {
      var active = document.querySelector('.map__pin--active');
      if (active) {
        active.classList.remove('map__pin--active');
      }
      if (isCardOpened) {
        var card = document.querySelector('.map__card');
        card.remove();
        isCardOpened = false;
      }
    }
  };
})();
