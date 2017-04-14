import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGIN_CANCEL = 'ACCOUNT.LOGIN_CANCEL'; //авторизация
export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация

