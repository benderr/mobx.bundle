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
//смена пароля
export const CHANGE_PASSWORD = createRequestTypes('ACCOUNT.CHANGE_PASSWORD');

// сервисы
export const GET_STATE_INTEGRATION = createRequestTypes('ACCOUNT.GET_STATE_INTEGRATION');
export const CONNECT_INTEGRATION = createRequestTypes('ACCOUNT.CONNECT_INTEGRATION');
export const UPD_STATE_INTEGRATION = 'ACCOUNT.UPD_STATE_INTEGRATION';
export const SAVE_INTEGRATION = createRequestTypes('ACCOUNT.SAVE_INTEGRATION');