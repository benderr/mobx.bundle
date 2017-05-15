/**
 * Created by RobertSabiryanov on 13.05.17.
 */
import {actions} from '../enums/actions';
import {createAction} from '../../../infrastructure/helpers/actionHelpers';

export const getProducts = {
	request: (retailPointId, start, count, name, code, price) => createAction(actions.GET_PRODUCTS.REQUEST,{retailPointId, start, count, name, code, price}),
	success: (response) => createAction(actions.GET_PRODUCTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_PRODUCTS.FAILURE, {error})
};

