import * as actions from '../enums/chequeActions'
import {createAction} from 'infrastructure/helpers/actionHelpers'
import {createRequestTypes} from 'infrastructure/helpers/actionHelpers'

// Enums
export const GET_CHEQUE = createRequestTypes('DOCUMENTS_CHEQUE.GET_CHEQUE');
export const SET_FILTER = 'DOCUMENTS_CHEQUE.SET_FILTER';

// Actions
export const getCheque = {
	request: (props) => createAction(GET_CHEQUE.REQUEST, {...props}),
	success: ({pos, totalCount, list, isFirst}) => createAction(GET_CHEQUE.SUCCESS, {pos, totalCount, list, isFirst}),
	failure: (error) => createAction(GET_CHEQUE.FAILURE, {error})
};

export const setFilterProps = (props) => createAction(SET_FILTER, props);