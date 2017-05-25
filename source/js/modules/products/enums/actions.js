/**
 * Created by RobertSabiryanov on 14.05.17.
 */
import {createRequestTypes, createAction} from 'infrastructure/helpers/actionHelpers'

export const GET_PRODUCTS = createRequestTypes('PRODUCTS.GET_PRODUCTS');
export const GET_FILTRED_PRODUCTS = createRequestTypes('PRODUCTS.GET_FILTRED_PRODUCTS');
export const GET_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.GET_PRODUCT_DETAIL');
export const SAVE_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.SAVE_PRODUCT_DETAIL');
export const RESET_PRODUCTS_LIST =  createAction('PRODUCTS.RESET_PRODUCTS_LIST');

