/**
 * Created by RobertSabiryanov on 13.05.17.
 */
import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const getProducts = {
	request: (retailPointId, start, count, filter, sort) => createAction(actions.GET_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	requestWithFilter: (retailPointId, start, count, filter, sort) => createAction(actions.GET_FILTRED_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	success: (response) => createAction(actions.GET_PRODUCTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_PRODUCTS.FAILURE, {error})
};


