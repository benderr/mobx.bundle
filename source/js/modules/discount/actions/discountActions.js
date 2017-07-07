import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for ListReducer
export const getListDiscount = {
	request: (props) => createAction(actions.GET_LIST.REQUEST, {column: 'name', orderBy:'asc', ...props}),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};

// Actions for EditReducer
export const openFromList = (discount) => createAction(actions.OPEN_FROM_LIST, {discount});
export const closeLayer = (isNew, formState) => createAction(actions.CLOSE_LAYER, {isNew, formState});

export const createDiscount = {
	request: (discount) => createAction(actions.CREATE.REQUEST, {discount}),
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
	success: (code) => createAction(actions.DELETE.SUCCESS, {code}),
	failure: (error) => createAction(actions.DELETE.FAILURE, {error})
};