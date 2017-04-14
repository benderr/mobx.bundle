const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9-])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const validEmail = (email, required = false) => {
	if ((email || '').length == 0)
		return !required;
	return EMAIL_REGEXP.test(email);
};

export const isEmpty = val => {
	return val == '' || val == null || val == undefined;
};