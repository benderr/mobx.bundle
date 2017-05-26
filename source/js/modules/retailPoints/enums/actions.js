import {createRequestTypes} from 'infrastructure/helpers/actionHelpers';


export const GET_RETAIL_POINTS = createRequestTypes('RETAIL_POINTS.GET_RETAIL_POINTS');//получение торг. точек
export const SET_RETAIL_POINT = 'RETAIL_POINTS.SET_RETAIL_POINT'; //установка торговой точки
export const ADD_RETAIL_POINT = createRequestTypes('RETAIL_POINTS.ADD_RETAIL_POINT');//добавление торг. точек
