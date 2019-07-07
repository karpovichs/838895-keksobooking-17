'use strict';

(function () {
  var PriceLevel = {
    LOW: 10000,
    HIGH: 50000
  };

  var checkPrice = function (offer, priceLevel) {
    switch (priceLevel) {
      case 'low':
        return offer.price < PriceLevel.LOW;
      case 'middle':
        return (offer.price >= PriceLevel.LOW && offer.price <= PriceLevel.HIGH);
      case 'high':
        return offer.price > PriceLevel.HIGH;
      default:
        return true;
    }
  };

  function checkFeatures(offer, checkedFeatures) {
    return checkedFeatures.every(function (feature) {
      return offer.features.includes(feature);
    });
  }

  var checkProperty = function (offerValue, filterValue) {
    return filterValue === window.filter.DEFAULT_VALUE || filterValue === offerValue.toString();
  };

  window.filter = {
    DEFAULT_VALUE: 'any',
    filterOffers: function (data, state) {
      return data.filter(function (datum) {
        var isProper = true;
        for (var key in state) {
          if (!state.hasOwnProperty(key)) {
            continue;
          }
          if (key === 'price') {
            isProper = checkPrice(datum.offer, state[key]);
          } else if (key === 'features') {
            isProper = checkFeatures(datum.offer, state[key]);
          } else {
            isProper = checkProperty(datum.offer[key], state[key]);
          }
          if (!isProper) {
            return false;
          }
        }
        return isProper;
      });
    }
  };
}());
