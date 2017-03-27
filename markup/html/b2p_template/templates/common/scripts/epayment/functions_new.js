$(document).ready(function () {

	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		email: 'Неверный email'
	});
	$.validator.addMethod("emailCustom", function (value, element) {
		return isValidEmail($(element).val());
	}, "Неверный email");

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
		}
	});
});