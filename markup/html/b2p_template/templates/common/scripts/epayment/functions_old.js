$(document).ready(function() {
	$('.text .more').click(function() {
		var block = $(this).parent();
		$(this).hide();
		$('.text-hide', block).slideDown(500);
		return false;
	});

	//чёрно-белые изображения
	$('.banners a').hover(
		function() {
			$('.img1', this).hide();
			$('.img2', this).show();
		},
		function() {
			$('.img2', this).hide();
			$('.img1', this).show();
		}
	);

	//накладываем маску
	$('.content-visa .rightBl input[name="phone"]').inputmask("mask", {"mask": "+9 (999) 999-9999"});

	//eldengi
	$('#variant').msDropDown();
	$('.content-visa .rightBl .btn2').click(function() {
		$('.content-visa input[type="text"], .content-visa input[type="number"], .content-visa input[type="tel"], .content-visa select').each(function() {
			var curVal = $.trim($(this).val());
			var curName = $(this).attr('name');
			if (curVal == '' || curVal == '0') {
				$(this).addClass('errorBox');
				$(this).parent().find('.errorMessage').text(REQURED_FIELD).show();
			} else {
				$(this).removeClass('errorBox');
				$(this).parent().find('.errorMessage').hide();
				if (curName == 'email') {
					if (!isValidEmail(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text(INCORRECT_EMAIL).show();
					}
				}

				if (curName == 'variant') {
					switch (curVal) {
						case 'qiwi':
							isQIWI();
							break;
						case 'ym':
							isYM();
							break;
						case 'wm':
							isWM();
							break;
						case 'gorod':
							isGorod();
							break;									   
					}
				}

				if (curName == 'firstName' || curName == 'lastName') {
					if (!isValidChars(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text(ONLY_LETTERS_ALLOWED).show();
					}
				}
			}
		});
		//если ошибок нет, отправляем форму
		if (!$('#el-form .errorMessage').is(':visible')) {
			$('#el-form').submit();
		}
	});

});