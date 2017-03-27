var CREDIT_ACC = '42301810';
var CARD_ACC = '40817810';
//Фиксированная комиссия в копейках
var FIXED_TAX = 0;

$(document).ready(function () {
	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		email: 'Неверный email',
		number: 'Неверное число'
	});

	$.validator.addMethod("emailCustom", function(value, element) {
		return $(element).val() == '' || isValidEmail($(element).val());
	}, "Неверный email");
	$.validator.addMethod("accountNumber", function(value, element) {
		return /^\d{20}$/.test($(element).val());
	}, "Номер счета должен состоять из 20 цифр");
	if(HAS_BIK){
		$.validator.addMethod("accountNumberCorrect", function(value, element) {
			return $(element).val().length == 20 && checkAccountCorrect($(element).val(), BIK);
		}, "Указан неправильный номер счета");
	}
	$.validator.addMethod("checkFIO", function(value, element) {
		return $(element).val() == '' || /^[А-ЯЁа-яё-]+[ ]+[А-ЯЁа-яё-]+[[ А-ЯЁа-яё-]+]*$/.test($(element).val());
	}, "Укажите фамилию, имя и отчество полностью");

	$('#payForm').validate({
		errorElement: "span",
		errorClass: 'has-error',
		errorPlacement: function(error, element) {
			element.tooltip('destroy');
			element.tooltip({title:error.text(),
				placement:'bottom',
				trigger:'manual'}).tooltip('show');
		},
		success: function(error, element){
			$(element).tooltip('destroy');
		},
		rules: {
			acc_number: {
				accountNumber: true,
				accountNumberCorrect: true && HAS_BIK
			},
			email: {
				emailCustom: true && HAS_EMAIL
			},
			amount: {
				number: true
			},
			fio: {
				checkFIO: true && HAS_FIO_CHECK
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
	});

	$('input.payment-type-control').each(function(){
		var self = $(this);
		var accountNumber = $('#accountNumberControl');

		function handler(control){
			accountNumber.removeAttr('disabled');
			if (control.val() == 'credit'){
				accountNumber.val(CREDIT_ACC);
			} else {
				accountNumber.val(CARD_ACC);
			}
		}

		self.click(function(){
			handler($(this));
		});

		if (self.is(':checked')){
			handler(self);
		};
	});

	$('.ps').each(function() {

		var self = $(this);
		var amountKopEl = $('#amount_kop');
		var feeKopEl = $('#fee_kop');
		var amountControlEl = $('#amountControl');
		var commEl = $('#totalCommission');
		var totEl = $('#totalAmount');

		function paymentSystem() {
			if ($("#cardTypeVisa").is(':checked')) {
				return 'VISA';
			} else 
			if ($("#cardTypeMasterCard").is(':checked')) {
				return 'MASTERCARD';
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
				if(c != 0 && c < FIXED_TAX){
					c = FIXED_TAX;
				}
				commEl.text(((c / 100.0).toFixed(2)));
				totEl.text((((a + c) / 100.0).toFixed(2)));
				feeKopEl.val(c);
			} else {
				c = trunc(a * (t / 100.0));
				if(c != 0 && c < FIXED_TAX){
					c = FIXED_TAX;
				}
				commEl.text(((c / 100.0).toFixed(2)));
				totEl.text((((a + c) / 100.0).toFixed(2)));
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
	

	$('input.desc-render').each(function(){
		
		function descHandler(){
			var accountNumberControlEl = $('#accountNumberControl');
			var contractControlEl = $('#contractControl');
			var totalAmountEl = $('#totalAmount');
			var commEl = $('#totalCommission');
			var fioEl = $('#fio');
			var descEl = $('#desc');
			if(accountNumberControlEl != undefined && accountNumberControlEl.val() != undefined && accountNumberControlEl.val() != ''){
				descEl.val('Перевод денежных средств на счет N'+accountNumberControlEl.val()+'. Получатель '+fioEl.val()+ " в сумме "+totalAmountEl.text()+ " руб. с комиссией "+commEl.text()+' руб.');
			} else if(contractControlEl != undefined && contractControlEl.val() != undefined && contractControlEl.val() != ''){
				descEl.val('Перевод денежных средств по договору N'+contractControlEl.val()+'. Получатель '+fioEl.val()+ " в сумме "+totalAmountEl.text()+ " руб. с комиссией "+commEl.text()+' руб.');
        	}
		}
		
		var self = $(this);
		self.on('input', function(){
			descHandler();
		}).trigger('input');
		
		self.click(function(){
			descHandler();
		});

		if (self.is(':checked')){
			descHandler();
		};
	});
			
});