import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const LOGIN = createRequestTypes('ACCOUNT.LOGIN');
export const LOGOUT = 'ACCOUNT.LOGOUT'; //авторизация
export const CHECKING_ACCESS_START = 'ACCOUNT.CHECKING_ACCESS_START';
export const CHECKING_ACCESS_STOP = 'ACCOUNT.CHECKING_ACCESS_STOP';

export const GET_RETAIL_POINTS = createRequestTypes('ACCOUNT.GET_RETAIL_POINTS');//получение торг. точек
export const SET_RETAIL_POINT = 'ACCOUNT.SET_RETAIL_POINT'; //установка торговой точки
