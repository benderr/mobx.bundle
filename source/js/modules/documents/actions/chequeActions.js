import * as actions from '../enums/chequeActions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for list
export const getCheque = {
	request: (props) => createAction(actions.GET_CHEQUE.REQUEST, {...props}),
	success: ({pos, totalCount, list, isFirst}) => createAction(actions.GET_CHEQUE.SUCCESS, {pos, totalCount, list, isFirst}),
	failure: (error) => createAction(actions.GET_CHEQUE.FAILURE, {error})
};