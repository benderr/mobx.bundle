import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

// Спиоск контрагентов
export const GET_LIST = createRequestTypes('CONTRAGENTS.GET_LIST');

// Форма добавления/редактирования контрагента
export const OPEN_DETAIL_ITEM = 'CONTRAGENTS.OPEN_DETAIL_ITEM';