$(document).ready(function () {

	$('#resolution').val(screen.width + 'x' + screen.height);
	var now = new Date();
	$('#time_zone_offset').val(-now.getTimezoneOffset() / 60);

	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		email: 'Неверный email'
	});
	$.validator.addMethod("emailCustom", function (value, element) {
		return isValidEmail($(element).val());
	}, "Неверный email");
	$.validator.addMethod("cvc", function (value, element) {
		if (/^6/.test($('#card').val()) && !$(element).val()){
			return true;
		}
		return isValidCVC($(element).val());
	}, "Неверный код безопасности");
	$.validator.addMethod("pan", function (value, element) {
		var val = $(element).val().replace(/\s/g,'');
		return louna(val);
	}, "Неверный номер карты");

	$('#payForm').validate({
		errorElement: "span",
		errorClass: 'has-error',
		errorPlacement: function (error, element) {
			element.tooltip('destroy');
			element.tooltip({title: error.text(),
				placement: 'bottom',
				trigger: 'manual'}).tooltip('show');
		},
		success: function (error, element) {
			$(element).tooltip('destroy');
		},
		rules: {
			email: {
				emailCustom: true
			},
			cvc: {
				cvc: true,
				required: {
					depends: function(element){
						return !/^6/.test($('#card').val());
					}
				}
			},
			pan: {
				pan: true
			}
		},
		submitHandler: function(form){
			var ps = cardType($('#card').val());
			if(notifies[ps] != undefined && notifies[ps]['ENABLE'] != undefined && notifies[ps]['ENABLE']){
				alert(notifies[ps]['MESSAGE']);
				return false;
			}
			var btn = $('#submitButton');
			var loader = $('#popup_loader');
			btn.attr('disabled','disabled');
			loader.show();
			form.submit();
		}
	});

	$('#cvcTooltip').tooltip({trigger: 'hover'});

	$('#card').on('keyup input', function(){
		var self = $(this);
		var value = self.val().replace(/\s/g,'');
		if (value){
			if (louna(value)){
				self.removeClass('has-error2');
			} else {
				self.addClass('has-error2');
			}
		} else {
			self.removeClass('has-error2');
		}
	});
})