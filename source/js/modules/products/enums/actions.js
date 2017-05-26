/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {createRequestTypes, createAction} from 'infrastructure/helpers/actionHelpers'

export const GET_PRODUCTS = createRequestTypes('PRODUCTS.GET_PRODUCTS');
export const GET_FILTRED_PRODUCTS = createRequestTypes('PRODUCTS.GET_FILTRED_PRODUCTS');
export const GET_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.GET_PRODUCT_DETAIL');
export const SAVE_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.SAVE_PRODUCT_DETAIL');
export const SAVE_MODIFIER = 'PRODUCTS.SAVE_MODIFIER'; //сохранить модификатор
export const REMOVE_MODIFIER = 'PRODUCTS.REMOVE_MODIFIER'; //удалить модификатор
export const SAVE_MODIFIER_GROUP = 'PRODUCTS.SAVE_MODIFIER_GROUP'; //сохранить группу модификатора
export const REMOVE_MODIFIER_GROUP = 'PRODUCTS.REMOVE_MODIFIER_GROUP'; //удалить группу модификатора
export const RESET_PRODUCTS_LIST =  'PRODUCTS.RESET_PRODUCTS_LIST';

