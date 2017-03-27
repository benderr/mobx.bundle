$(document).ready(function () {
	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		number: 'Неверное число'
	});

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
				amount: {
					number: true
				}
			},
			submitHandler: function(form){
				if(customSubmitHandler !== undefined){
					return customSubmitHandler(form);
				} else {
					//form.submit();
					return true;
				}
			}
		}
	);
	
	$('.ps').each(function() {
		var self = $(this);
		var amountKopEl = $('#amount_kop');
		var feeKopEl = $('#fee_kop');
		var amountControlEl = $('#amountControl');
		var commEl = $('#comm');
		var totEl = $('#tot');

		function paymentSystem() {
			if ($("#inlineRadio1").is(':checked')) {
				return 'VISA';
			} else if ($("#inlineRadio2").is(':checked')) {
				return 'WEBMONEY';
			} else if ($("#inlineRadio3").is(':checked')) {
				return 'YANDEXDENGI';
			} else if ($("#inlineRadio4").is(':checked')) {
				return 'QIWI';
			} else if ($("#inlineRadio5").is(':checked')) {
				return 'GOROD';
			} else if ($("#inlineRadio6").is(':checked')) {
				return 'MOBILE';
			} 
		}

		function handler() {
			var amount;
			if (AMOUNT_IS_0) {
			   var val = amountControlEl.val().replace(',','.');
			   amount = getFloat(val);
			} else {
			   amount = trunc(AMOUNT_DIV); 
			}
			var ps = paymentSystem();
			var ia = ps + '_IN_AMOUNT';
			var t = tax[ps];
			var a = trunc(amount.toFixed(2)*100);
			var c;
			if (tax[ia] === true) {
				var a2 = a / (1 - t/100.0);
				c = trunc(a2 - a);
				commEl.text(((c / 100.0).toFixed(2)) + ' руб.');
				totEl.text((((a + c) / 100.0).toFixed(2)) + ' руб.');
				feeKopEl.val(c);
			} else {
				c = trunc(a * (t / 100.0));
				commEl.text(((c / 100.0).toFixed(2)) + ' руб.');
				totEl.text((((a + c) / 100.0).toFixed(2)) + ' руб.');
				feeKopEl.val(c);
			}
			amountKopEl.val(a);
		}

		self.on('input', function(){
			handler();
		}).trigger('input');

		self.click(function(){
			handler();
		});

		if (self.is(':checked')){
			handler();
		};
	});
});