import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_ORDERS = createRequestTypes('DOCUMENTS.GET_ORDERS');
export const GET_ORDER_DETAILS = createRequestTypes('DOCUMENTS.GET_ORDER_DETAILS');
export const CREATE_ORDER = createRequestTypes('DOCUMENTS.CREATE_ORDER');
export const ADD_PRODUCT = 'DOCUMENTS.ADD_PRODUCT';
export const REMOVE_PRODUCT = 'DOCUMENTS.REMOVE_PRODUCT';