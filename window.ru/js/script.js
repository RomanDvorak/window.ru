window.addEventListener('DOMContentLoaded', function() {

  'use strict';
  // first popup
  let callEngineerBtn = document.querySelector('.popup_engineer_btn'),
      engineerPopup = document.querySelector('.popup_engineer'),
      engineerPopupDialog = engineerPopup.querySelector('.popup_dialog');

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

  let phonesPopup = document.querySelector('.popup');

  document.addEventListener('click', function(e) {
    if(e.target.parentNode.classList.contains('popup_close') ||
     e.target.classList.contains('popup')) {
       e.preventDefault();
      phonesPopup.style.display = 'none';
    } else if (e.target.classList.contains('phone_link')) {
        e.preventDefault();
      phonesPopup.style.display = 'block';
    }
  });

  // forms send

  let message = {
    loading: '<div class="status-ico-div"><img src="icons/loading.svg" class="status-ico" alt="loading"><span class="status-ico-div-span">Идёт загрузка, подождите...</span></div>',
    success: '<div class="status-ico-div"><img src="icons/checked.svg" class="status-ico" alt="checked"><span class="status-ico-div-span">Заявка успешно оставлена!</span></div>',
    failure: '<div class="status-ico-div"><img src="icons/error.svg" class="status-ico" alt="fail"><span class="status-ico-div-span">Произошла ошибка!</span></div>'
  };
  let form = document.querySelectorAll('.form'),
      statusMessage = document.createElement('div'),
      phoneInputs = document.querySelectorAll('input[type="tel"]');
  
    
  for (let i = 0; i < phoneInputs.length; i++) {
      addMask(phoneInputs[i]);
  }
  function addMask(input) {
    input.addEventListener('input', function() {
      input.value = input.value.replace(/[^0-9+() ]/ig, '');
      });
  }
  
  statusMessage.classList.add('status');
  statusMessage.classList.add('status-ico-div');
    
  for (let i = 0; i < form.length; i++) {
    sendForm(form[i]);
  }


  function sendForm(elem) {
    elem.addEventListener('submit', function (event) {
      event.preventDefault();
      elem.appendChild(statusMessage);
      let inputs = elem.getElementsByTagName('input');
      elem.appendChild(statusMessage);
      let formData = new FormData(elem);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open("POST", '../server.php');
          request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

          let obj = {};
          formData.forEach(function(value, key) {
            obj[key] = value;
          });
          let json = JSON.stringify(obj);

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status == 200) {
              if (request.status == 200 && request.status < 300) {
                resolve();
              } else {
                reject();
              }
            }
          };

          request.send(json);
        });
      } // End postData


      function clearInput() {
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = '';
        }
      }

      postData(formData)
      .then(() => statusMessage.innerHtml = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(clearInput);
    });
  }

    // 60 seconds popup

    setTimeout(function() { phonesPopup.style.display = 'block'; }, 60000);

    // tabs
    let tab = document.querySelectorAll('.firstTabSelect'),
    treeLink = document.querySelector('.tree_link'),
    aluminumLink = document.querySelector('.aluminum_link'),
    plasticLink = document.querySelector('.plastic_link'),
    frenchLink = document.querySelector('.french_link'),
    riseLink = document.querySelector('.rise_link'),
    info = document.querySelector(".firstTabInfo"),
    tabContent = document.querySelectorAll(".firstTabContent"),
    tabLink = document.querySelectorAll('.selectorLink');

    function hideTabContent(a) {
      for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
      }
    }
  
    hideTabContent(1);
  
    function showTabContent(b) {
      if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
      }
    }
  
    info.addEventListener('click', function(event) {
      let target = event.target;
      if (target && (target.classList.contains('tabSelector') || target.parentNode.classList.contains('tabSelector'))) {
         for (let i = 0; i < tab.length; i++) {
           tabLink[i].classList.remove('active');
         }
         
        for(let i = 0;i< tab.length; i++) {
            hideTabContent(0);
            if (target.classList.contains('treeSelector') ||
             target.parentNode.classList.contains('treeSelector')) {
              treeLink.classList.add('active');
              showTabContent(0);
            }
            else if(target.classList.contains('aluminumSelector') ||
             target.parentNode.classList.contains('aluminumSelector')) {
              aluminumLink.classList.add('active');
              showTabContent(1);
            }
            else if(target.classList.contains('plasticSelector') ||
             target.parentNode.classList.contains('plasticSelector')) {
              plasticLink.classList.add('active');
              showTabContent(2);
            }
            else if(target.classList.contains('frenchSelector') ||
             target.parentNode.classList.contains('frenchSelector')) {
              frenchLink.classList.add('active');
              showTabContent(3);
            }
            else if(target.classList.contains('riseSelector') ||
             target.parentNode.classList.contains('riseSelector')) {
              riseLink.classList.add('active');
              showTabContent(4);
            }
            break;
        }
      }
    });

  


});