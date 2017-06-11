const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9-])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const validEmail = (email, required = false) => {
	if ((email || '').length == 0)
		return !required;
	return EMAIL_REGEXP.test(email);
};

export const validChars = (string) => {
	return /^[а-яА-ЯёЁ][а-яА-ЯёЁ\-\s]*$/.test(string);
};

export const isEmpty = val => {
	return val === '' || val === null || val === undefined;
};

export const isRequired = (text) => (val) => isEmpty(val) ? text : undefined;

export const isCorrectInn = function (INN) {
	var factor1 = [2, 4, 10, 3, 5, 9, 4, 6, 8];
	var factor2 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
	var factor3 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8];
	var i = 0;
	var sum = 0;
	var sum2 = 0;
	var Result = false;
	var d;
	if (INN.length == 0) {
		Result = true;
	}
	else if (INN.length == 10) { //юр лицо
		sum = 0;
		for (i = 0; i <= 8; i++) {
			d = INN.slice(i, i + 1);
			sum += d * factor1[i];
		}
		sum = sum % 11;
		sum = sum % 10;
		Result = INN.slice(9, 10) == sum;

	}
	else if (INN.length == 12) {//физ лицо и ИП
		sum = 0;
		for (i = 0; i <= 9; i++) {
			d = INN.slice(i, i + 1);
			sum += d * factor2[i];
		}
		sum = sum % 11;
		sum = sum % 10;
		sum2 = 0;
		for (i = 0; i <= 10; i++) {
			d = INN.slice(i, i + 1);
			sum2 += d * factor3[i];
		}
		sum2 = sum2 % 11;
		sum2 = sum2 % 10;
		Result = INN.slice(10, 11) == sum &&
			INN.slice(11, 12) == sum2;
	}
	return Result;
};

export const isCorrectKpp = (val) => {
	if (!val)
		return true;
	return val.length === 9;
};

