import * as actions from '../enums/orderActions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

/**
 * Получение списка заказов
 */
export const getOrders = {
	request: ({start, count, q, sortField, sortDirection, isFirst}) => createAction(actions.GET_ORDERS.REQUEST, {
		start,
		count,
		q,
		sortField,
		sortDirection,
		isFirst
	}),
	success: ({pos, totalCount, orders, isFirst}) => createAction(actions.GET_ORDERS.SUCCESS, {
		pos,
		totalCount,
		orders,
		isFirst
	}),
	failure: ({error}) => createAction(actions.GET_ORDERS.FAILURE, {error})
};

export const getOrderDetails = {
	request: ({id, point}) => createAction(actions.GET_ORDER_DETAILS.REQUEST, {id, point}),
	success: ({order}) => createAction(actions.GET_ORDER_DETAILS.SUCCESS, {order}),
	failure: ({id, error}) => createAction(actions.GET_ORDER_DETAILS.FAILURE, {id, error})
};

export const createOrder = {
	request: ({order}) => createAction(actions.CREATE_ORDER.REQUEST, {order}),
	success: ({id, order}) => createAction(actions.CREATE_ORDER.SUCCESS, {id, order}),
	failure: ({error}) => createAction(actions.CREATE_ORDER.FAILURE, {error})
};

