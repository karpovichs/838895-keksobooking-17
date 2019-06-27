'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  function createAlert(template, className) {
    var fragment = document.createDocumentFragment();
    var element = template.cloneNode(true);
    fragment.appendChild(element);
    document.querySelector('main').appendChild(fragment);
    element.classList.add(className);

    return (template, className);
  }
  function onAlertEscPress(evt) {
    window.utils.isEscEvent(evt, hideAlert);
  }

  function onAlertClick(evt) {
    if (!evt.target.classList.contains('error__button')) {
      hideAlert();
    }
  }

  function hideAlert() {
    var alerts = document.querySelectorAll('.error, .success');
    alerts.forEach(function (alert) {
      alert.remove();
    });
    document.removeEventListener('keydown', onAlertEscPress);
  }

  window.alerts = {
    showError: function () {
      createAlert(errorTemplate, 'error');
      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('click', hideAlert);
      document.addEventListener('click', onAlertClick);
      document.addEventListener('keydown', onAlertEscPress);
    },

    showSuccess: function () {
      createAlert(successTemplate, 'sucess');
      document.addEventListener('click', onAlertClick);
      document.addEventListener('keydown', onAlertEscPress);
    }
  };
})();
