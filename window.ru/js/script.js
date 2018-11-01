window.addEventListener('DOMContentLoaded', function() {

  'use strict';

  let callEngineerBtn = document.querySelector('.popup_engineer_btn'),
      engineerPopup = document.querySelector('.popup_engineer'),
      engineerPopupDialog = engineerPopup.querySelector('.popup_dialog'),
      engineerPopupContent = engineerPopupDialog.querySelector('.popup_content'),
      engineerPopupClose = engineerPopupContent.querySelector('.popup_close');

  callEngineerBtn.addEventListener('click', function() {
    engineerPopup.style.display = 'block';
  });
  document.addEventListener('click', function(e) {
    if(e.target.parentNode.classList.contains('popup_close') || e.target.classList.contains('popup_engineer')) {
      engineerPopup.style.display = 'none';
    }
  });
});