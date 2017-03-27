$(document).ready(function () {
	
	//Если есть кастомный алгоритм расчета комиссии - устанавливаем иное название кнопки отправки и комиссию в 0
	var needsRecalc = false;
	if(algorithmAvailable){
		needsRecalc = true;
		$('#fee_value').val('0');
		$('#submitButton').val(CONTINUE).prop({'disabled' : true});
	}

	$('#resolution').attr('value', screen.width + 'x' + screen.height);
	var now = new Date();
	$('#time_zone_offset').attr('value', -now.getTimezoneOffset() / 60);

	//Placeholders for non-html5 browsers
	$('input').placeholder();

	function arrowSize() {
		$('#c2c_form_arrow').each(function () {
			var self = $(this),
			parent = self.prev(),
			borderWidth = parent.outerHeight() / 2;
			self.css({
				borderTopWidth: borderWidth + 'px',
				borderBottomWidth: borderWidth + 'px'
			});
		});
	}

	//Window sizing
	$(window).resize(function () {
		arrowSize();
	});
	arrowSize();
	
	//Validator
	$.extend($.validator.messages, {
		required: 'Поле обязательно',
		email: 'Неверный email',
		number: 'Неверное число'
	});

	$.validator.addMethod("panCustom", function (value, element) {
		return /^[\d ]+$/.test($(element).val()) && louna($(element).val().replace(/\s/g, ''));
	}, "Неверный номер карты");
	$.validator.addMethod("emailCustom", function (value, element) {
		return $(element).val() == '' || isValidEmail($(element).val());
	}, "Неверный email");
	$.validator.addMethod("cvc", function (value, element) {
		if (/^6/.test($('#cardFrom').val()) && !$(element).val()){
			return true;
		}
		return isValidCVC($(element).val());
	}, "Неверный код безопасности");
	$.validator.addMethod("pansEqual", function (value, element) {
		return $(element).val() != $('#cardFrom').val();
	}, "Номер карты получателя совпадает с номером карты отправителя");
	$.validator.addMethod("numberCustom", function (value, element) {
		return /^\d+((,|\.)\d+)?$/.test($(element).val());
	}, "Неверное число");
	$.validator.addMethod("maxSum", function (value, element) {
    	var summAll = parseFloat($('#amountControl').val().replace(",",".")) + parseFloat($('#fee_value').val())/100;
    	return summAll <= 75000;
    }, "Максимальная сумма перевода с учетом комиссии должна быть не более 75 000 руб.");
	$.validator.addMethod("blackBins", function (value, element) {
		var val = value.replace(/\s/g, '');
		return val.length < 6 || (val.length > 6 && $.inArray(val.substr(0,6), blackBins) == -1);
    }, "Операция с использованием указанных карточных реквизитов запрещена.");
	$.validator.addMethod("blackBins2", function (value, element) {
		var val = value.replace(/\s/g, '');
		return val.length < 6 || (val.length > 6 && $.inArray(val.substr(0,6), blackBins2) == -1);
    }, "Операция с использованием указанных карточных реквизитов запрещена.");

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
			emailFrom: {
				emailCustom: true
			},
			cvc: {
				cvc: true,
				required: {
					depends: function(element){
						return !/^6/.test($('#cardFrom').val());
					}
				}
			},
			pan1: {
				panCustom: true,
				blackBins: true
			},
			pan2: {
				panCustom: true,
				pansEqual: true,
				blackBins2: true
			}
		},
		submitHandler: function(form){
			
			// Убираем плейсхолдер, записанный в value при отправке формы
			if($('input[name=emailFrom]') != undefined && $('input[name=emailFrom]')[0] != undefined && $('input[name=emailFrom]')[0].value == 'E-mail'){
				$('input[name=emailFrom]')[0].value = '';
			}
			if($('input[name=emailTo]') != undefined && $('input[name=emailTo]')[0] != undefined && $('input[name=emailTo]')[0].value == 'E-mail'){
				$('input[name=emailTo]')[0].value = '';
			}
			
			//Проверяем на разрешение платежа для МПС
			var ps = cardType($('#cardFrom').val());
			if(notifies[ps] != undefined && notifies[ps]['ENABLE'] != undefined && notifies[ps]['ENABLE']){
				alert(notifies[ps]['MESSAGE']);
				return false;
			}
			
			//Вызываем дополнительную функцию проверки
			if(customAdditionalSubmitHandler !== undefined){
				customAdditionalSubmitHandler(form);
			} 
			
			//Если есть кастомный алгоритм расчета комиссии - вызываем сервис и устанавливаем значения полей
			if(algorithmAvailable && needsRecalc){
				$('#popup_loader').show();
				$('#submitButton').prop({'disabled' : true});
				var token1;
				var token2;
				if($('input[name="token"]') != undefined && $('input[name="token"]')[0] != undefined ){
					token1 = $('input[name="token"]').val();
				}
				if($('input[name="token2"]') != undefined && $('input[name="token2"]')[0] != undefined ){
					token2 = $('input[name="token2"]').val();
				}
				var data = {
					'sector' : $('input[name="sector"]').val(),
					'amount' : getFloat($('#amountControl').val().replace(',', '.')).toFixed(2) * 100
				}
				if(token1 != undefined){
					data['token1'] = token1;
				} else {
					data['pan1'] = $('#cardFrom').val().replace(/\s/g, '');
				}
				if(token2 != undefined){
					data['token2'] = token2;
				} else {
					data['pan2'] = $('#cardTo').val().replace(/\s/g, '');
				}
				$.ajax({
					url: '/webapi/P2PFee',
					method: 'post',
					data: data,
					success: function(commission){
						fillForm(getFloat($('#amountControl').val().replace(',', '.')), commission);
						$('#submitButton').val(TRANSFER);
						needsRecalc = false;
						$('#popup_loader').hide();
						$('#submitButton').prop({'disabled' : false});
					},
					error: function(data){
						$('#popup_loader').hide();
						$('#submitButton').prop({'disabled' : false});
					}
				});
				return false;
			}
			
			if (window.confirm(CONFIRM_FUNDS + $('#amountControl').val() + ' руб. ' +
					FEE + $('#totalCommission').text()+' руб.')) {
				var btn = $('#submitButton');
				var loader = $('#popup_loader');
				btn.attr('disabled','disabled');
				loader.show();
				$('#amount').val(getFloat($('#amountControl').val().replace(',', '.')) * 100);
				form.submit();
			}
		}
	});
	$('#amountControl').rules('add', {
		numberCustom: true,
		maxSum: true
	})

	$('#cardFrom, #cardTo').each(function () {
		var self = $(this);
		var icon = self.next('.form-control-feedback');
		self.on('keyup input', function () {
			var self = $(this);
			var value = self.val().replace(/\s/g, '');
			// Correctness test
			if (value) {
				if (louna(value)) {
					self.removeClass('has-error2');
				} else {
					self.addClass('has-error2');
				}
			} else {
				self.removeClass('has-error2');
			}
			// Payment system icons
			icon.removeClass('visa-ico mastercard-ico maestro-ico');
			if (value) {
				if (/^4/.test(value)) {
					icon.addClass('visa-ico');
				} else if (/^5/.test(value)) {
					icon.addClass('mastercard-ico');
				} else if (/^6/.test(value)) {
					icon.addClass('maestro-ico');
				} else if (/^22/.test(value)) {
					icon.addClass('mir-ico');
				}
			}
		});
	});

	$('#cvcTooltip').tooltip({trigger: 'hover'});

	$('#cardFrom, #cardTo, #amountControl').each(function () {

		var self = $(this);
		var amountControlEl = $('#amountControl');
		var cardFromEl = $('#cardFrom');
		var cardToEl = $('#cardTo');

		self.on('input', function () {
			var val = amountControlEl.val().replace(',', '.');
			amountControlEl.val(val);
			var amount = getFloat(val);
			var commission = 0;
			var pan1 = cardFromEl.val().replace(/\s/g, '');
			var pan2 = cardToEl.val().replace(/\s/g, '');
			// Если нет доступного алгоритма расчета комиссии - выполняем расчет по стандартному
			if(!algorithmAvailable){
				var binComm = bin_fee_calc(bss(pan1, pan2), amount * 100.0);
				if (binComm !== undefined) {
					commission = binComm; 
				} else {
					var pss = cardType(pan1) + '_' + cardType(pan2);
					commission = fee_calc(pss, amount * 100.0);
				}
				fillForm(amount, commission);
			} else {
				//Если есть изменение поля, но при этом флаг необходимости пересчета комиссии не установлен - устанавливаем его
				if(!needsRecalc){
					needsRecalc = true;
					$('#submitButton').val(CONTINUE);
				}
				if(amount > 0 && pan1.length >= 16 && pan2.length >= 16){
					needsRecalc = true;
					$('#submitButton').prop({'disabled' : false});
				} else {
					$('#submitButton').prop({'disabled' : true});
				}
			} 
		}).trigger('input');
	});
	
	function fillForm(amount, commission){
		var totalAmount = amount + commission / 100.0;
		$('#totalAmount').text(totalAmount.toFixed(2));
		$('#totalCommission').text((commission / 100.0).toFixed(2));
		$('#fee_value').val(commission);
	}

});