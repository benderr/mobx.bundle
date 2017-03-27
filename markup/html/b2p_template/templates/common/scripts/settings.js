$(function(){
	$('.text .more').click(function(){
		var block = $(this).parent();
		$(this).hide();
		$('.text-hide', block).slideDown(500);
		return false;  
	});

	//чёрно-белые изображения
	$('.banners a').hover(
		function(){
			$('.img1', this).hide();
			$('.img2', this).show();
		},
		function(){
			$('.img2', this).hide();
			$('.img1', this).show();
		}
	);

	//всплывающие подсказки
	$('.content-visa .rightBl input[type="text"], .content-visa .rightBl .codeVopros, .content-visa .rightBl select').qtip({
		position: {
			my: 'right top',
			at: 'right bottom',
			target: 'mouse'
		}
	});

	//убираем всплывающие подсказки при фокусе
	$('.content-visa input, .content-visa select').focus(function(){
		$(this).qtip('hide');
	});

	//накладываем маску
	$('.content-visa .rightBl input[name="phone"]').inputmask("mask", {"mask": "+9 (999) 999-9999"});
	$('.content-visa .rightBl input[name="pan"]').inputmask("mask", {"mask": "9999 9999 9999 9999"});
        $('.content-visa .rightBl input[name="cvc"]').inputmask("mask", {"mask": "999"});

	//валидация и отправка формы (виза дополнительная)
	$('.content-visa .rightBl .btn1').click(function(){
		$('.content-visa input[type="text"], .content-visa select').each(function(){
			var curVal = del_spaces($(this).val());
			var curName = $(this).attr('name');
			if (curVal == '' || curVal == '0') {
				$(this).addClass('errorBox');
				if (curName == 'month' || curName == 'year') {
					$(this).parent().find('.errorMessage2').text('Поле обязательно').show();
				}
				else {
					$(this).parent().find('.errorMessage').text('Поле обязательно').show();
				}
			}
			else {
				$(this).removeClass('errorBox');
				if (curName == 'month' || curName == 'year') {
					if (curName == 'year') {
						if(!$(this).parent().find('.errorMessage2').is(':visible')) {
							$(this).parent().find('.errorMessage2').hide();
						}
					}
					else {
						$(this).parent().find('.errorMessage2').hide();
					}
				}
				else {
					$(this).parent().find('.errorMessage').hide();
				}

				//ок, данные заполнены, проверяем на соответствие
				if (curName == 'pan') {
					var curValDigital = parseInt(curVal.substring(curVal.length - 1, curVal.length));
					var curValLess = curVal.substring(0, curVal.length - 1);

					if (Calculate(curValLess) != parseInt(curValDigital) || curVal.toString().length < 16) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text('Неверный PAN').show();
					}
				}
                                
                                
//                                if (curName == 'cvc') {
//					if (!isValidCVC(curVal)) {
//						$(this).addClass('errorBox');
//						$(this).parent().find('.errorMessage').text('Неверный CVC').show();
//					}
//				}

				if (curName == 'email') {
					if (!isValidEmail(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text('Неверный email').show();
					}
				}

				if (curName == 'phone') {
					if (!isValidPhone(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text('Неверный телефон').show();
					}
				}

				
			}
		});

		//если ошибок нет, отправляем форму
		if(!$('#visa-form .errorMessage, #visa-form .errorMessage2').is(':visible')) {
                        $('#payButton').attr('disabled', 'disabled');
                        $('#cancelButton').attr('disabled', 'disabled');
			$('#visa-form').submit();
		}
	});

	$('.content-visa input[type="text"], .content-visa select').change(function(){
		var curName = $(this).attr('name');
		$(this).removeClass('errorBox');
		if (curName == 'month' || curName == 'year') {
			if (curName == 'year') {
				if(!$(this).parent().find('.errorMessage2').is(':visible')) {
					$(this).parent().find('.errorMessage2').hide();
				}
			}
			else {
				$(this).parent().find('.errorMessage2').hide();
			}
		}
		else {
			$(this).parent().find('.errorMessage').hide();
		}
	});


	//eldengi
	$('#variant').msDropDown();
	$('.content-visa .rightBl .btn2').click(function(){
		$('.content-visa input[type="text"], .content-visa select').each(function(){
			var curVal = $.trim($(this).val());
			var curName = $(this).attr('name');
			if (curVal == '' || curVal == '0') {
				$(this).addClass('errorBox');
				$(this).parent().find('.errorMessage').text('Поле обязательно').show();
			}
			else {
				$(this).removeClass('errorBox');
				$(this).parent().find('.errorMessage').hide();
                                $(this).parent().find('.errorMessage').hide();
				if (curName == 'email') {
					if (!isValidEmail(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text('Неверный email').show();
					}
				}

				if (curName == 'variant') {
					switch(curVal) {
						case 'qiwi': isQIWI(); break;
						case 'ym': isYM(); break;
						case 'wm': isWM(); break;
					}
				}
			}
		});
		//если ошибок нет, отправляем форму
		if(!$('#el-form .errorMessage').is(':visible')) {
			$('#el-form').submit();
		}
	});

});

//функции
function checkDigits(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode
	 //if the key isn't the backspace key (which we should allow)
		if (unicode < 48 || unicode > 57) //if not a number
			return false //disable key press
	
}

function Calculate(Luhn) {
	var sum = 0;
	for (i = 0; i < Luhn.length; i++) {
		sum += parseInt(Luhn.substring(i, i + 1));
	}
	var delta = new Array(0, 1, 2, 3, 4, -4, -3, -2, -1, 0);
	for (i = Luhn.length - 1; i >= 0; i -= 2) {
		var deltaIndex = parseInt(Luhn.substring(i, i + 1));
		var deltaValue = delta[deltaIndex];
		sum += deltaValue;
	}
	var mod10 = sum % 10;
	mod10 = 10 - mod10;
	if (mod10 == 10) {
		mod10 = 0;
	}
	return mod10;
}

function checkLetters(e) {
	var unicode = e.charCode ? e.charCode : e.keyCode
	if (unicode != 8) { //if the key isn't the backspace key (which we should allow)
		var ch = String.fromCharCode(unicode);
		var s = "abcdefjhigklmnopqrstuvwyxyz-. ";
		return (s.indexOf(ch.toLowerCase()) >= 0);
	}
}

//function to check valid email address
function isValidEmail(email) {
	var validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return validRegExp.test(email);
}

//function to check valid phone address
function isValidPhone(phone) {
	var validRegExp = /^[0-9+\- \(\)]+$/;
	return validRegExp.test(phone);
}


//function to check valid phone address
function isValidCVC(cvc) {
	var validRegExp = /^[0-9]{3}$/;
	return validRegExp.test(cvc);
}

function isWM(){
	document.data.wm.value="1";
	document.data.ym.value="0";
	document.data.qiwi.value="0";
}

function isYM(){
	document.data.wm.value="0";
	document.data.ym.value="1";
	document.data.qiwi.value="0"; 
}

function isQIWI(){
	document.data.wm.value="0";
	document.data.ym.value="0";
	document.data.qiwi.value="1";
}

function doCancel() {
    document.data.action.value = "cancel";
    document.data.submit();
}

function changeCountry(country) {
	document.data.country.value = country;
}

// Функция удаления пробелов
function del_spaces(str) {
	str = str.replace(/\s/g, '');
	return str;
}

function displayInline() {
    var f = document.getElementById('screen');
    f.style.display = "inline";
}
