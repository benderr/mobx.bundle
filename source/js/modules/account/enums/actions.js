import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGIN_INFO = createRequestTypes('ACCOUNT.LOGIN_INFO');

export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация
export const enums = {
	APP_START: 'APP_START', //запуск приложения
	LOGIN_INFO: {
		SUCCESS: 'LOGIN_INFO.SUCCESS',
		FAIL: 'LOGIN_INFO.FAIL'
	}
};

