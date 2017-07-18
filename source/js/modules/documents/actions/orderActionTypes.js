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