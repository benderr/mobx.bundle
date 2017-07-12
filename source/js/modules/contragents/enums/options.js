export const roles = {
	CASHIER: {
		label: 'Кассир',
		password: true,
		passwordRequired: false
	},
	CUSTOMER: {
		label: 'Покупатель'
	},
	EMPLOYEE: {
		label: 'Сотрудник'
	},
	ADMINISTRATOR: {
		label: 'Администратор',
		password: true
	},
	SERVICE_PROVIDER: {
		label: 'Поставщик услуг'
	},
	PROVIDER: {
		label: 'Поставщик'
	}
};

export const rolesCode = [
	'CASHIER',
	'CUSTOMER',
	'EMPLOYEE',
	'ADMINISTRATOR',
	'SERVICE_PROVIDER',
	'PROVIDER'
];