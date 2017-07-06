import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const getListDiscount = {
	request: (props) => createAction(actions.GET_LIST.REQUEST, props),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, response),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};

export const createDiscount = {
	request: (props) => createAction(actions.CREATE.REQUEST, {props}),
	success: () => createAction(actions.CREATE.SUCCESS),
	failure: (error) => createAction(actions.CREATE.FAILURE, {error})
};

export const updateDiscount = {
	request: (props) => createAction(actions.UPDATE.REQUEST, {props}),
	success: () => createAction(actions.UPDATE.SUCCESS),
	failure: (error) => createAction(actions.UPDATE.FAILURE, {error})
};

export const deleteDiscount = {
	request: (code) => createAction(actions.DELETE.REQUEST, {code}),
	success: () => createAction(actions.DELETE.SUCCESS),
	failure: (error) => createAction(actions.DELETE.FAILURE, {error})
};