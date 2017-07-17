import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for ListReducer
export const getListContragent = {
	request: (props) => createAction(actions.GET_LIST.REQUEST, {column: 'name', orderBy:'asc', ...props}),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};
export const checkboxCashier = (checked) => createAction(actions.CHECKED_CASHIER, {checked});

// Actions for EditReducer
export const OpenFromList = (contragent) => createAction(actions.OPEN_FROM_LIST, {contragent});