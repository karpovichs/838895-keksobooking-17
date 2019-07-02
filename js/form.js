'use strict';

(function () {
  var filterSelect = document.querySelectorAll('.map__filter');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('input[name=address]');
  var typeSelect = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('input[name=price]');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var formSubmit = adForm.querySelector('.ad-form__submit');
  var roomNumberSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var capacityOptions = capacitySelect.querySelectorAll('option');

  function changeMinPrice() {
    priceInput.min = window.utils.AccommodationType[typeSelect.value.toUpperCase()].PRICE;
    priceInput.placeholder = window.utils.AccommodationType[typeSelect.value.toUpperCase()].PRICE;
  }

  function setCapacity(value) {
    capacitySelect.value = value;
    if (value !== '0') {
      capacityOptions.forEach(function (option) {
        option.style.display = 'block';
        if (option.value > value || option.value === '0') {
          option.style.display = 'none';
        }
      });
    } else {
      capacityOptions.forEach(function (option) {
        option.style.display = 'block';
        if (option.value !== '0') {
          option.style.display = 'none';
        }
      });
    }
  }

  function changeAvailableCapacity() {
    switch (roomNumberSelect.value) {
      case '1':
        setCapacity('1');
        break;
      case '2':
        setCapacity('2');
        break;
      case '3':
        setCapacity('3');
        break;
      case '100':
        setCapacity('0');
        break;
    }
  }

  function onSubmitSuccess() {
    window.alerts.showSuccess();
  }

  function onSubmitError() {
    window.alerts.showError();
    formSubmit.disabled = false;
  }

  function onFormSubmit(evt) {
    evt.preventDefault();

    formSubmit.disabled = true;
    window.backend.save(new FormData(adForm), function () {
      onSubmitSuccess();
      formSubmit.disabled = false;
    }, onSubmitError);
  }

  window.utils.formDisable(formFieldset);
  window.utils.formDisable(filterSelect);
  addressInput.value = '545, 445';
  changeMinPrice();

  typeSelect.addEventListener('change', changeMinPrice);
  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });
  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });
  changeAvailableCapacity();
  roomNumberSelect.addEventListener('change', changeAvailableCapacity);

  adForm.addEventListener('submit', onFormSubmit);
})();
