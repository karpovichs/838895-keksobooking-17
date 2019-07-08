'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DRAG_EVENTS = ['dragenter', 'dragover', 'dragleave', 'drop'];

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
  var avatarChooser = adForm.querySelector('#avatar');
  var avatarPreview = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  var imagesChooser = adForm.querySelector('#images');
  var imagesPreview = adForm.querySelector('.ad-form__photo');
  var avatarDropZone = adForm.querySelector('.ad-form-header__drop-zone');
  var imagesDropZone = adForm.querySelector('.ad-form__drop-zone');

  function readAndPreview(file, image) {
    var matches = FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
      return true;
    } else {
      return false;
    }
  }

  function multipleReadAndPreview(files) {
    imagesPreview.style = 'display: none';
    for (var i = 0; i < files.length; i++) {
      var image = document.createElement('img');
      if (!readAndPreview(files[i], image)) {
        continue;
      }
      var container = document.createElement('div');
      container.style = 'display: flex; align-items: center';
      container.classList.add('ad-form__photo', 'uploaded-image');
      readAndPreview(files[i], image);
      image.width = 50;
      image.style = 'margin: 0 auto;';
      container.appendChild(image);
      adForm.querySelector('.ad-form__photo-container').appendChild(container);
    }
  }

  function onSingleDrop(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    readAndPreview(data.files[0], avatarPreview);
  }

  function onMultipleDrop(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer;
    multipleReadAndPreview(data.files);
  }

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

  function clearUploadedImages() {
    var uploaded = adForm.querySelectorAll('.uploaded-image');
    uploaded.forEach(function (image) {
      image.remove();
    });
    imagesPreview.style = 'display: block';
    avatarPreview.src = 'img/muffin-grey.svg';
  }

  function onSubmitSuccess() {
    window.map.pageReset();
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

  typeSelect.addEventListener('change', changeMinPrice);
  timeInSelect.addEventListener('change', function () {
    timeOutSelect.value = timeInSelect.value;
  });
  timeOutSelect.addEventListener('change', function () {
    timeInSelect.value = timeOutSelect.value;
  });
  changeAvailableCapacity();
  roomNumberSelect.addEventListener('change', changeAvailableCapacity);

  DRAG_EVENTS.forEach(function (event) {
    avatarDropZone.addEventListener(event, function (evt) {
      evt.preventDefault();
    });
    imagesDropZone.addEventListener(event, function (evt) {
      evt.preventDefault();
    });
  });

  avatarDropZone.addEventListener('drop', function (evt) {
    onSingleDrop(evt);
  });

  imagesDropZone.addEventListener('drop', function (evt) {
    onMultipleDrop(evt);
  });

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    readAndPreview(file, avatarPreview);
  });

  imagesChooser.addEventListener('change', function () {
    var files = imagesChooser.files;
    multipleReadAndPreview(files);
  });

  adForm.addEventListener('submit', onFormSubmit);

  window.form = {
    formEnable: function () {
      adForm.classList.remove('ad-form--disabled');
      window.utils.formEnable(formFieldset);
    },
    formReset: function () {
      adForm.reset();
      adForm.classList.add('ad-form--disabled');
      window.utils.formDisable(formFieldset);
      addressInput.value = '545, 445';
      changeMinPrice();
      changeAvailableCapacity();
      clearUploadedImages();
    }
  };
})();
