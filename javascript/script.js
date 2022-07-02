"use strict";

// Меню бургер
const menu = document.querySelector('.burger-menu');
const language = document.querySelector('.lang');

menu.addEventListener('click', () => {
	document.body.classList.toggle('_lock');
	document.querySelector('.header__nav').classList.toggle('_active');
	menu.classList.toggle('_active')
});
language.addEventListener('click', () => {
	language.classList.toggle('_active');
});


// Настройки Swiper
const swiper = new Swiper('.swiper', {
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

// Popup 
// Аттрибут data-popup="nameOfClass"
const buttons = document.querySelectorAll('.button');
const popUpCloseElements = document.querySelectorAll('.popup-close');

const popUpClose = () => {
	for (let i = 0; i < popUpCloseElements.length; i++) {
		const popCloseElement = popUpCloseElements[i];
		const popUp = document.querySelector('.popup');
		if (document.querySelectorAll('._open')) {
			popCloseElement.addEventListener('click', () => {
				popUp.classList.remove('_open');
				document.body.classList.remove('_lock');
				document.body.style.paddingRight = null;
			});
			// if (!popCloseElement.target.closest('.popup__wrapper')) {
				
			// }
		}
		
	}
};
const popUpCheck = () => {
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		if (button.hasAttribute('data-popup')) { // Есть ли у тега аттрибут data-popup
			if (!(button.getAttribute('data-popup') == 0)) { // Проверяет есть ли значение у аттрибута
				const popUpButton = button;
				const popUpClassName = button.getAttribute('data-popup');
				if (document.querySelector(`.${popUpClassName}`)) { // Проверка существует ли класс в HTML
					const popUp = document.querySelector(`.${popUpClassName}`);
					popUpButton.addEventListener('click', () => {
						popUp.classList.add('_open');
						document.body.classList.add('_lock');
						document.body.style.paddingRight = getScrollBarSize()+'px';
					});
				}else {
					console.log('Нету такого класса в HTML');
				}
			}
		}
	}
}
popUpClose();
popUpCheck();

// Проверка устройства
let isMobile = {
	Android: function() {return navigator.userAgent.match(/Android/i);},
	BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},
	iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},
	Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},
	Windows: function() {return navigator.userAgent.match(/IEMobile/i);},
	any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}
};

// При полной загрузке контента
window.addEventListener('DOMContentLoaded', function() {
	//	Стрелка меню
	if (isMobile.any()) {
		document.body.classList.add('_touch');
		const arrows = document.querySelectorAll('.arrow');
		
		for (let index = 0; index < arrows.length; index++) {
			const thisArrow = arrows[index];
			const thisLink = thisArrow.parentElement;
			const subMenu = thisArrow.nextElementSibling;

			thisLink.classList.add('_parent');
			
			thisArrow.addEventListener('click', () => {
				subMenu.classList.toggle('_open');
				thisArrow.classList.toggle('_active');
			});
		}
	}else {
		document.body.classList.add('_pc');
	}

	// Валидация формы заявки
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._form-req')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.getAttribute('type') === "checkbox" && input.checked === false) {
				formAddError(input);
				error++;
			}else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}


	// Маска под input telephone
	[].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});

// Динамический адаптив
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();


// Размер ширины скролл бара
function getScrollBarSize () {  
	var inner = document.createElement('p');  
	inner.style.width = "100%";  
	inner.style.height = "100%";  
 
	var outer = document.createElement('div');  
	outer.style.position = "absolute";  
	outer.style.top = "0px";  
	outer.style.left = "0px";  
	outer.style.visibility = "hidden";  
	outer.style.width = "100px";  
	outer.style.height = "100px";  
	outer.style.overflow = "hidden";  
	outer.appendChild (inner);  
 
	document.body.appendChild (outer);  
 
	var w1 = inner.offsetWidth;  
	outer.style.overflow = 'scroll';  
	var w2 = inner.offsetWidth;  
	if (w1 == w2) w2 = outer.clientWidth;
 
	document.body.removeChild (outer);  
 
	return (w1 - w2);  
 };