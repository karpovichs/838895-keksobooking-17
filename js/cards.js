'use strict';

(function () {
  var AccomodationType = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var roomsDic = {
    'one': 'комната',
    'few': 'комнаты',
    'many': 'комнат'
  };

  var guestDic = {
    'one': 'гостя',
    'few': 'гостей',
    'many': 'гостей'
  };

  var PhotoSize = {
    width: 45,
    height: 40
  };

  var isCardOpened = false;
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function setFeature(feature, data) {
    var featureName = feature.classList[1].slice(feature.classList[1].indexOf('--') + 2);
    if (data.indexOf(featureName) === -1) {
      feature.style.display = 'none';
    }
  }

  function setCard(card) {
    var cardElement = cardTemplate.cloneNode(true);
    var features = cardElement.querySelectorAll('.popup__feature');

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').innerHTML = card.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = card.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = card.offer.price + '&#x20bd;/ночь';
    cardElement.querySelector('.popup__type').innerHTML = AccomodationType[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').innerHTML = card.offer.rooms + ' ' + window.utils.getPlural(roomsDic, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + window.utils.getPlural(guestDic, card.offer.guests);
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    features.forEach(function (feature) {
      setFeature(feature, card.offer.features);
    });
    cardElement.querySelector('.popup__description').innerHTML = card.offer.description;
    cardElement.querySelector('.popup__close').addEventListener('click', function () {
      window.cards.clearCard();
    });
    cardElement.querySelector('.popup__photo').remove();
    var fragment = document.createDocumentFragment();
    card.offer.photos.forEach(function (url) {
      var photo = document.createElement('img');
      photo.src = url;
      photo.width = PhotoSize.width;
      photo.height = PhotoSize.height;
      photo.alt = 'Фотография жилья';
      photo.classList.add('popup__photo');
      fragment.appendChild(photo);
    });
    cardElement.querySelector('.popup__photos').appendChild(fragment);
    return cardElement;
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
