window.addEventListener('DOMContentLoaded', function() {

  'use strict';
  // first popup
  let callEngineerBtn = document.querySelector('.popup_engineer_btn'),
      engineerPopup = document.querySelector('.popup_engineer'),
      engineerPopupDialog = engineerPopup.querySelector('.popup_dialog'),
      engineerPopupContent = engineerPopupDialog.querySelector('.popup_content');

  callEngineerBtn.addEventListener('click', function() {
    engineerPopup.style.display = 'block';
  });
  document.addEventListener('click', function(e) {
    if(e.target.parentNode.classList.contains('popup_close') ||
     e.target.classList.contains('popup_engineer')) {
      engineerPopup.style.display = 'none';
    }
  });

  // phones

  let phones = document.querySelectorAll('.phone_link'),
      phonesPopup = document.querySelector('.popup');

  document.addEventListener('click', function(e) {
    e.preventDefault();
    if(e.target.parentNode.classList.contains('popup_close') ||
     e.target.classList.contains('popup')) {
      phonesPopup.style.display = 'none';
    } else if (e.target.classList.contains('phone_link')) {
      phonesPopup.style.display = 'block';
    }
  });

});