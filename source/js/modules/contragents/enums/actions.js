import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

// Спиоск контрагентов
export const GET_LIST = createRequestTypes('CONTRAGENTS.GET_LIST');

// Форма добавления/редактирования контрагента
export const OPEN_DETAIL_ITEM = 'CONTRAGENTS.OPEN_DETAIL_ITEM';
export const CHANGE_ROLE = 'CONTRAGENTS.CHECGE_ROLE';
export const CREATE_CONTRAGENT = createRequestTypes('CONTRAGENTS.CREATE_CONTRAGENT');
export const UPDATE_CONTRAGENT = createRequestTypes('CONTRAGENTS.UPDATE_CONTRAGENT');