import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

export const GET_PRODUCTS = createRequestTypes('PRODUCTS.GET_PRODUCTS');
export const GET_FILTRED_PRODUCTS = createRequestTypes('PRODUCTS.GET_FILTRED_PRODUCTS');
export const GET_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.GET_PRODUCT_DETAIL');
export const SAVE_PRODUCT_DETAIL = createRequestTypes('PRODUCTS.SAVE_PRODUCT_DETAIL');
export const SAVE_MODIFIER = 'PRODUCTS.SAVE_MODIFIER'; //сохранить модификатор
export const REMOVE_MODIFIER = 'PRODUCTS.REMOVE_MODIFIER'; //удалить модификатор
export const SAVE_MODIFIER_GROUP = 'PRODUCTS.SAVE_MODIFIER_GROUP'; //сохранить группу модификатора
export const REMOVE_MODIFIER_GROUP = 'PRODUCTS.REMOVE_MODIFIER_GROUP'; //удалить группу модификатора
export const RESET_PRODUCTS_LIST = 'PRODUCTS.RESET_PRODUCTS_LIST';
export const SEARCH_PRODUCTS = createRequestTypes('PRODUCTS.SEARCH_PRODUCTS'); //поиск продуктов для выпадушки
export const SET_DEFAULT_SEARCH_PRODUCT = 'PRODUCTS.SET_DEFAULT_SEARCH_PRODUCT'; //установка в выпадайке дефолтного продукта при открытии
export const CREATE_PRODUCT = 'PRODUCTS.CREATE_PRODUCT'; //Создание балванки для нового продукта
export const SET_NEW_PRODUCT = 'PRODUCTS.SET_NEW_PRODUCT'; //Создание балванки для нового продукта (если перезагрузили страницу)
export const ADD_PRODUCT_DETAIL = 'PRODUCTS.ADD_PRODUCT_DETAIL'; //добавление нового продукта в стор слоя

