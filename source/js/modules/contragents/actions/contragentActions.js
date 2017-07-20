import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for ListReducer
export const getListContragent = {
	request: (props) => createAction(actions.GET_LIST.REQUEST, {column: 'name', orderBy:'asc', ...props}),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};
export const checkboxCashier = (checked) => createAction(actions.CHECKED_CASHIER, {checked});
export const loadDetailContragent = (code) => createAction(actions.LOAD_DETAIL, {code});

// Actions for EditReducer
export const openFromList = (contragent) => createAction(actions.OPEN_FROM_LIST, {contragent});

export const createContragent = {
	request: (contragent) => createAction(actions.CREATE.REQUEST, {contragent}),
	success: () => createAction(actions.CREATE.SUCCESS)
};

export const updateContragent = {
	request: (contragent) => createAction(actions.UPDATE.REQUEST, {contragent}),
	success: (code) => createAction(actions.UPDATE.SUCCESS, {code})
};

export const deleteContragent = {
	request: (code) => createAction(actions.DELETE.REQUEST, {code})
};