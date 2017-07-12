import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for ListReducer
export const getListContragent = {
	request: (props) => createAction(actions.GET_LIST.REQUEST, {column: 'name', orderBy:'asc', ...props}),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};

// Actions for EditReducer
export const openFromList = (contragent) => createAction(actions.OPEN_FROM_LIST, {contragent});
export const closeLayer = (isNew, formState) => createAction(actions.CLOSE_LAYER, {isNew, formState});
export const changeRole = (roles, code) => createAction(actions.CHANGE_ROLE, {roles, code});

export const createContragent = {
	request: (discount) => createAction(actions.CREATE.REQUEST, {discount}),
	success: () => createAction(actions.CREATE.SUCCESS),
	failure: (error) => createAction(actions.CREATE.FAILURE, {error})
};

export const updateContragent = {
	request: (discount) => createAction(actions.UPDATE.REQUEST, {discount}),
	success: (discount) => createAction(actions.UPDATE.SUCCESS, {discount}),
	failure: (error, discount) => createAction(actions.UPDATE.FAILURE, {error, discount})
};

export const deleteContragent = {
	request: (code) => createAction(actions.DELETE.REQUEST, {code}),
	success: (code) => createAction(actions.DELETE.SUCCESS, {code}),
	failure: (error) => createAction(actions.DELETE.FAILURE, {error})
};

export const loadDetailContragent = {
	request: (code) => createAction(actions.LOAD_DETAIL.REQUEST, {code}),
	success: (code) => createAction(actions.LOAD_DETAIL.SUCCESS, {code}),
	failure: (error) => createAction(actions.LOAD_DETAIL.FAILURE, {error})
};