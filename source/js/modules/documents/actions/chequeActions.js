import {createAction} from 'infrastructure/helpers/actionHelpers'
import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

// Enums
export const GET_LIST = createRequestTypes('DOCUMENTS_CHEQUE.GET_LIST');
export const SET_FILTER_PARAMS = 'DOCUMENTS_CHEQUE.SET_FILTER_PARAMS';

// Actions
export const getListCheque = {
	request: (req) => createAction(GET_LIST.REQUEST, req),
	success: (res) => createAction(GET_LIST.SUCCESS, res),
	failure: (err) => createAction(GET_LIST.FAILURE)
};
export const setFilterParams = (props) => createAction(SET_FILTER_PARAMS, props);