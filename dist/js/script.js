/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cards: () => (/* binding */ cards)
/* harmony export */ });
const cards = data => {
  const parrentBlock = document.querySelector('.menu__field .container');
  parrentBlock.innerHTML = '';
  data.then(data => {
    data.data.forEach(card => {
      parrentBlock.innerHTML += `<div class="menu__item">
    <img src="${card.imgSrc}" alt="${card.alt}">
    <h3 class="menu__item-subtitle">Меню.... "${card.menuName}"</h3>
    <div class="menu__item-descr">${card.description}</div>
    <div class="menu__item-divider"></div>
    <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${card.price}</span> грн/день</div>
    </div>
    </div>`;
    });
  });
};

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forms: () => (/* binding */ forms)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");


const forms = () => {
  const $forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Успешно!',
    failure: 'что-то пошло не так...'
  };
  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'multipart/form-data;'
      },
      body: data
    });
    return await res.json();
  };
  $forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = 'display: block; margin: 0 auto;';
      form.append(statusMessage);
      let obj = {};
      new FormData(form).forEach(function (value, key) {
        obj[key] = value;
      });
      let json = JSON.stringify(obj);
      postData('http://localhost:3000/requests', json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
      // r.setRequestHeader('Content-type', 'multipart/form-data;');
    });
  });
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.style.display = 'none';
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>`;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
      prevModalDialog.style.display = 'block';
    }, 3000);
  }

  // fetch('http://localhost:3000/menu')
  //     .then(data => data.json())
  //     .then(res => console.log(res));
  // fetch('http://localhost:3000/requests')
  //     .then(data => data.json())
  //     .then(res => console.log(res));
  // showThanksModal();
};

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   modal: () => (/* binding */ modal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
let closeModal;
let openModal;
const modal = () => {
  const $modal = document.querySelector('.modal');
  const $openModalButtons = document.querySelectorAll('[data-modal]');
  closeModal = function () {
    $modal.style.display = '';
    document.body.style.overflow = '';
  };
  openModal = function () {
    $modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
  };
  $openModalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openModal();
    });
  });
  $modal.addEventListener('click', e => {
    if (e.target.classList.contains('modal') || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });
  function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  const modalTimerId = setTimeout(openModal, 500000);
  window.addEventListener('scroll', showModalByScroll);
  return {
    closeModal: closeModal
  };
};


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slider: () => (/* binding */ slider)
/* harmony export */ });
const slider = () => {
  const _offerSliderCounter = document.querySelector('.offer__slider-counter'),
    _nextBtn = _offerSliderCounter.querySelector('.offer__slider-next'),
    _prevBtn = _offerSliderCounter.querySelector('.offer__slider-prev'),
    _current = _offerSliderCounter.querySelector('#current'),
    _total = _offerSliderCounter.querySelector('#total');
  const sliderWrapper = document.querySelector('.offer__slider-wrapper');
  const totalSlidesNum = document.querySelectorAll('.offer__slide').length - 1;
  let currentSlideNum = 0;
  let dots;
  _total.textContent = getZiro(totalSlidesNum + 1);
  function showSlideNumber(n) {
    sliderWrapper.style.transform = `translateY(-${n * 390}px)`;
    _current.textContent = getZiro(currentSlideNum + 1);
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    dots[n].classList.add('active');
  }
  _nextBtn.addEventListener('click', () => {
    if (currentSlideNum === totalSlidesNum) {
      currentSlideNum = 0;
      showSlideNumber(currentSlideNum);
    } else {
      currentSlideNum += 1;
      showSlideNumber(currentSlideNum);
    }
  });
  _prevBtn.addEventListener('click', () => {
    if (currentSlideNum === 0) {
      currentSlideNum = totalSlidesNum;
      showSlideNumber(currentSlideNum);
    } else {
      currentSlideNum -= 1;
      showSlideNumber(currentSlideNum);
    }
  });
  createDots();
  showSlideNumber(0);
  function createDots(params) {
    const dotParrent = document.querySelector('.slider-navigation');
    for (let i = 0; i < totalSlidesNum + 1; i++) {
      dotParrent.innerHTML += '<div class="slider-navigation__dot"></div>';
    }
    dots = document.querySelectorAll('.slider-navigation__dot');
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentSlideNum = i;
        showSlideNumber(currentSlideNum);
      });
    });
  }
};
function getZiro(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tabs: () => (/* binding */ tabs)
/* harmony export */ });
const tabs = () => {
  const tabBtns = document.querySelectorAll('.tabheader__item');
  function showTabNumber(n) {
    const tabs = document.querySelectorAll('.tabcontent');
    tabs.forEach(element => {
      element.classList.remove('active');
      element.classList.remove('animate__bounceIn');
    });
    tabs[n].classList.add('active');
    tabs[n].classList.add('animate__bounceIn');
    tabBtns.forEach(element => {
      element.classList.remove('tabheader__item_active');
    });
    tabBtns[n].classList.add('tabheader__item_active');
  }
  tabBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
      showTabNumber(i);
    });
  });
  showTabNumber(2);
};


/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   timer: () => (/* binding */ timer)
/* harmony export */ });
const timer = dateStr => {
  const dateEnd = new Date(dateStr);
  let spanDays = document.getElementById('days');
  let spanHours = document.getElementById('hours');
  let spanMinutes = document.getElementById('minutes');
  let spanSeconds = document.getElementById('seconds');
  let interval1 = setInterval(timerRander, 1000);
  function addZiro(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function timerRander() {
    const remainTime = dateEnd - new Date();
    if (remainTime < 0) {
      spanDays.textContent = "00";
      spanHours.textContent = "00";
      spanMinutes.textContent = "00";
      spanSeconds.textContent = "00";
      clearInterval(interval1);
    } else {
      spanDays.textContent = addZiro(Math.floor(remainTime / (1000 * 3600 * 24)));
      spanHours.textContent = addZiro(Math.floor(remainTime / (1000 * 3600) % 24));
      spanMinutes.textContent = addZiro(Math.floor(remainTime / (1000 * 60) % 60));
      spanSeconds.textContent = addZiro(Math.floor(remainTime / 1000 % 60));
    }
  }
  timerRander();
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");







window.addEventListener('DOMContentLoaded', () => {
  const getResourse = async url => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return res.json();
  };

  // const cardData = [
  //     {
  //         imgSrc: 'img/tabs/vegy.jpg',
  //         alt: 'vegy',
  //         menuName: 'Фитнес',
  //         description: `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //         price: 229
  //     },
  //     {
  //         imgSrc: 'img/tabs/elite.jpg',
  //         alt: 'elite',
  //         menuName: 'Премиум',
  //         description: `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  //         price: 550
  //     },
  //     {
  //         imgSrc: 'img/tabs/post.jpg',
  //         alt: 'post',
  //         menuName: 'Постное',
  //         description: `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
  //         price: 430
  //     }
  // ]

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.tabs)();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.timer)('2024-01-30T14:31:00.000');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.modal)();

  // cards(axios.get('http://localhost:3000/menu'));

  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.forms)();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.slider)();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map