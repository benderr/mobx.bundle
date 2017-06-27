import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

//авторизация
export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация
export const CLEAR_APP = 'CLEAR_APP'; //авторизация
export const CHECKING_ACCESS_START = 'ACCOUNT.CHECKING_ACCESS_START';
export const CHECKING_ACCESS_STOP = 'ACCOUNT.CHECKING_ACCESS_STOP';

//регистрация
export const REGISTER = createRequestTypes('ACCOUNT.REGISTER');
//восстановление пароля
export const FORGOT = createRequestTypes('ACCOUNT.FORGOT');
export const FORGOT_RESET = 'ACCOUNT.FORGOT_RESET';
//смена пароля
export const CHANGE_PASSWORD = createRequestTypes('ACCOUNT.CHANGE_PASSWORD');