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
          if(elem.classList.contains('calcForm')) {
            obj.height = calcInfo.height;
            obj.width = calcInfo.width;
            obj.selectedBalcony = calcInfo.selectedBalcony;
            obj.checkbox = calcInfo.checkbox;
            obj.select = calcInfo.select;
          }
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

  // calc

  let calcBtns = document.querySelectorAll('.popup_calc_btn'),
      calcClose1 = document.querySelector('.popup_calc_close'),
      calcPopup1 = document.querySelector('.popup_calc'),
      balconySelect = document.querySelector('.balcon_icons'),
      smallBalconyImg = balconySelect.querySelectorAll('img'),
      bigBalcony = document.querySelector('.big_img'),
      bigBalconyImg = bigBalcony.querySelectorAll('img'),
      calcPopup1Height = document.querySelector('#height'),
      calcPopup1Width = document.querySelector('#width'),
      calcPopup1Continue = document.querySelector('.popup_calc_button'),
      calcPopupProfile = document.querySelector('.popup_calc_profile'),
      calcPopupProfileClose = document.querySelector('.popup_calc_profile_close'),
      calcPopupProfileSelect = document.querySelector('select.form-control'),
      calcPopupProfileCheckboxCold = document.querySelectorAll('.checkbox')[0],
      calcPopupProfileCheckboxWarm = document.querySelectorAll('.checkbox')[1],
      calcPopupProfileContinue = document.querySelector('.popup_calc_profile_button'),
      calcPopupEnd = document.querySelector('.popup_calc_end'),
      calcPopupEndClose = document.querySelector('.popup_calc_end_close'),
      calcInfo = {};

  for (let i = 0; i < calcBtns.length; i++) {
    showPopup(calcBtns[i], calcPopup1);
  }
  function showPopup(button, popup) {
    button.addEventListener('click', function() {
      popup.style.display = 'block';
    });
  }
    calcClose1.addEventListener('click', function() {
      calcPopup1.style.display = 'none';
      for (let key in calcInfo) {
          delete calcInfo[key];
      }
    });
  balconySelect.addEventListener('click', function(e) {
    let target = event.target;
    if (target.tagName == 'IMG') {
      e.preventDefault();
      for (let i = 0; i < smallBalconyImg.length; i++) {
        if (target == smallBalconyImg[i]) {
          for (let j = 0; j < bigBalconyImg.length; j++) {
            bigBalconyImg[j].style.display = 'none';
            
          }
          for (let j = 0; j < smallBalconyImg.length; j++) {
            animDecrease(smallBalconyImg[j]);
          }
          bigBalconyImg[i].style.display = 'inline-block';
          animIncrease(smallBalconyImg[i]);
          calcInfo.selectedBalcony = i + 1;
        }
      }
    }
  });
  function animIncrease(elem) {
    let width = elem.width,
        height = elem.height,
        id = requestAnimationFrame(increase);

    function increase() {
      if (width >= 110) {
        clearInterval(id);
      } else {
        width = width + 1;
        height = height + 1;
        elem.style.height = height + 'px';
        elem.style.width = width + 'px';
        id = requestAnimationFrame(increase);
      }
    }
  }
  function animDecrease(elem) {
    let width = elem.width,
        height = elem.height,
        id = requestAnimationFrame(decrease);

    function decrease() {
      if (width == 80 && height == 40) {
        clearInterval(id);
      } else {
        width = width - 1;
        height = height - 1;
        elem.style.height = height + 'px';
        elem.style.width = width + 'px';
        id = requestAnimationFrame(decrease);
      }
    }
  }

  calcPopup1Height.addEventListener('input', function() {
    calcPopup1Height.value = calcPopup1Height.value.replace(/\D/g, '');
  });
  calcPopup1Width.addEventListener('input', function() {
    calcPopup1Width.value = calcPopup1Width.value.replace(/\D/g, '');
  });

  calcPopup1Continue.addEventListener('click', function(e) {
    if(calcPopup1Height.value == '' || calcPopup1Width.value == '') {
      e.preventDefault();
    } else {
      calcInfo.width = calcPopup1Width.value;
      calcInfo.height = calcPopup1Height.value;
      if (calcInfo.selectedBalcony == undefined) {
        calcInfo.selectedBalcony = 1;
      }
      calcPopup1.style.display = 'none';
      calcPopupProfile.style.display = 'block';
    }
  });
  calcPopupProfileClose.addEventListener('click', function() {
    calcPopupProfile.style.display = 'none';
    for (let key in calcInfo) {
      delete calcInfo[key];
    }
  });
  calcPopupProfileCheckboxCold.addEventListener('click', function(e) {
    if (calcPopupProfileCheckboxWarm.checked) {
      e.preventDefault();
    }
  });
  calcPopupProfileCheckboxWarm.addEventListener('click', function(e) {
    if (calcPopupProfileCheckboxCold.checked) {
      e.preventDefault();
    }
  });

  calcPopupProfileContinue.addEventListener('click', function(e) {
     if (calcPopupProfileCheckboxWarm.checked || calcPopupProfileCheckboxCold.checked) {
       calcInfo.select = calcPopupProfileSelect.options[calcPopupProfileSelect.selectedIndex].value;
       if(calcPopupProfileCheckboxWarm.checked) {
      calcInfo.checkbox = 'Warm';
    } else if(calcPopupProfileCheckboxCold.checked) {
      calcInfo.checkbox = 'Cold';
    }
    calcPopupProfile.style.display = 'none';
    calcPopupEnd.style.display = 'block';
     }
    else {
      e.preventDefault();
    }
  });
  calcPopupEndClose.addEventListener('click', function() {
    calcPopupEnd.style.display = 'none';
    for (let key in calcInfo) {
        delete calcInfo[key];
    }
  });
  // tabs 2
  let secondTab = document.querySelectorAll('.decoration_item'),
  secondInfo = document.querySelector(".decoration_slider"),
  secondTabContent = document.querySelectorAll(".secondTabsContent"),
  secondTabLink = document.querySelectorAll('.secondTabsLink'),
  internalLink = document.querySelector('.internal_link'),
  externalLink = document.querySelector('.external_link'),
  risingLink = document.querySelector('.rising_link'),
  roofLink = document.querySelector('.roof_link');

  function hideTabContent2(a) {
    for (let i = a; i < secondTabContent.length; i++) {
      secondTabContent[i].classList.remove('show');
      secondTabContent[i].classList.add('hide');
    }
  }

  hideTabContent2(1);

  function showTabContent2(b) {
    if (secondTabContent[b].classList.contains('hide')) {
      secondTabContent[b].classList.remove('hide');
      secondTabContent[b].classList.add('show');
    }
  }

  secondInfo.addEventListener('click', function(event) {
    let target = event.target;
    if (target && (target.classList.contains('secondTabsLink') || target.parentNode.classList.contains('secondTabsLink'))) {
       for (let i = 0; i < secondTab.length; i++) {
         secondTabLink[i].classList.remove('after_click');
       }
       
      for(let i = 0;i< secondTab.length; i++) {
          hideTabContent2(0);
          if (target.classList.contains('internal_link') ||
           target.parentNode.classList.contains('internal_link')) {
            internalLink.classList.add('after_click');
            showTabContent2(0);
          }
          else if(target.classList.contains('external_link') ||
           target.parentNode.classList.contains('external_link')) {
            externalLink.classList.add('after_click');
            showTabContent2(1);
          }
          else if(target.classList.contains('rising_link') ||
           target.parentNode.classList.contains('rising_link')) {
            risingLink.classList.add('after_click');
            showTabContent2(2);
          }
          else if(target.classList.contains('roof_link') ||
           target.parentNode.classList.contains('roof_link')) {
            roofLink.classList.add('after_click');
            showTabContent2(3);
          }
          break;
      }
    }
  });


});