import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

//авторизация
export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация
export const CHECKING_ACCESS_START = 'ACCOUNT.CHECKING_ACCESS_START';
export const CHECKING_ACCESS_STOP = 'ACCOUNT.CHECKING_ACCESS_STOP';

//регистрация
export const REGISTER = createRequestTypes('ACCOUNT.REGISTER');
//восстановление пароля
export const FORGOT = createRequestTypes('ACCOUNT.FORGOT');