import {createAction} from 'infrastructure/helpers/actionHelpers'
import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

// Enums
export const GET_LIST = createRequestTypes('DOCUMENTS_CHEQUE.GET_LIST');

// Actions
export const getListCheque = {
	request: (req) => createAction(GET_LIST.REQUEST, req),
	success: (res) => createAction(GET_LIST.SUCCESS, res),
	failure: (err) => createAction(GET_LIST.FAILURE)
};