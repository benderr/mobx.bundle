$(document).ready(function(){
	$('input').placeholder();

	$('.text .more').click(function () {
		var block = $(this).parent();
		$(this).hide();
		$('.text-hide', block).slideDown(500);
		return false;
	});
	
	//tooltips
	$('.content-visa .rightBl .codeVopros').qtip({
        position: {
            my: 'right top',
            at: 'right bottom',
            target: 'mouse'
        }
    });

    // remove tooltips focus
    $('.content-visa input, .content-visa select').focus(function() {
        $(this).qtip('hide');
    });

	// black-and-white images
	$('.banners a').hover(
		function () {
			$('.img1', this).hide();
			$('.img2', this).show();
		},
		function () {
			$('.img2', this).hide();
			$('.img1', this).show();
		}
	);

	// validation and form submission
	$('.content-visa .rightBl .btn1').click(function () {
		$('.content-visa input[type="text"], .content-visa input[type="number"], .content-visa input[type="tel"], .content-visa select').each(function () {
			var curVal = del_spaces($(this).val());
			var curName = $(this).attr('name');
			var pan = $('#pan').val();
			if (curVal === '' || curVal === '0') {
				$(this).addClass('errorBox');
				if (curName === 'month' || curName === 'year') {
					$(this).parent().find('.errorMessage2').text(REQURED_FIELD).show();
				} else if ((curName !== 'email' && curName !== 'cvc') || (curName === 'email' && mailFlag) || (curName === 'cvc' && !isMaestro(pan))) {
					$(this).parent().find('.errorMessage').text(REQURED_FIELD).show();
				}
			} else {
				$(this).removeClass('errorBox');
				if (curName === 'month' || curName === 'year') {
					if (curName === 'year') {
						if (!$(this).parent().find('.errorMessage2').is(':visible')) {
							$(this).parent().find('.errorMessage2').hide();
						}
					} else {
						$(this).parent().find('.errorMessage2').hide();
					}
				} else {
					$(this).parent().find('.errorMessage').hide();
				}

				// OK, these are filled, check for compliance
				if (curName === 'pan') {
					var curValDigital = parseInt(curVal.substring(curVal.length - 1, curVal.length));
					var curValLess = curVal.substring(0, curVal.length - 1);
					if (Calculate(curValLess) !== parseInt(curValDigital) || curVal.toString().length < 16) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text(INCORRECT_PAN).show();
					}
				}

				if (curName === 'cvc' && curVal.length < 3 && !isMaestro(pan)) {
					$(this).parent().find('.errorMessage').text(INCORRECT_CVV).show();
				}

				if (curName === 'email') {
					if (!isValidEmail(curVal)) {
						$(this).addClass('errorBox');
						$(this).parent().find('.errorMessage').text(INCORRECT_EMAIL).show();
					}
				}
			}
		});

		// if there are no errors, send the form
		if (!$('#visa-form .errorMessage, #visa-form .errorMessage2').is(':visible')) {

			var ps = cardType($('#pan').val());
			if(notifies[ps] != undefined && notifies[ps]['ENABLE'] != undefined && notifies[ps]['ENABLE']){
				alert(notifies[ps]['MESSAGE']);
				return false;
			}
			
			var val = $('#pan').val().replace(/\s/g, '');
			if(!(val.length < 6 || (val.length > 6 && $.inArray(val.substr(0,6), blackBins) == -1))){
		    	alert("Операция с использованием указанных карточных реквизитов запрещена.");
		    	return false;
			}

			$('#payButton').attr('disabled', 'disabled');
			$('#cancelButton').attr('disabled', 'disabled');
			$('#resolution').attr('value', screen.width + 'x' + screen.height);
			var now = new Date();
			$('#time_zone_offset').attr('value', -now.getTimezoneOffset() / 60);
			$('#visa-form').submit();
		}
	});

	$('.content-visa input[type="text"], .content-visa input[type="number"], .content-visa input[type="tel"], .content-visa select').change(function () {
		var curName = $(this).attr('name');
		$(this).removeClass('errorBox');
		if (curName === 'month' || curName === 'year') {
			if (curName === 'year') {
				if (!$(this).parent().find('.errorMessage2').is(':visible')) {
					$(this).parent().find('.errorMessage2').hide();
				}
			} else {
				$(this).parent().find('.errorMessage2').hide();
			}
		} else {
			$(this).parent().find('.errorMessage').hide();
		}
	});
});