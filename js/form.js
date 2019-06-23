'use strict';

(function () {
  var AccomodationType = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var filterSelect = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var adressInput = adForm.querySelector('input[name=address]');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('input[name=price]');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  function changeMinPrice() {
    priceInput.min = AccomodationType[typeSelect.value.toUpperCase()];
    priceInput.placeholder = AccomodationType[typeSelect.value.toUpperCase()];
  }

  window.utils.formDisable(formFieldset);
  window.utils.formDisable(filterSelect);
  adressInput.value = '545, 445';

  typeSelect.addEventListener('change', changeMinPrice);
  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });
  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });
})();
