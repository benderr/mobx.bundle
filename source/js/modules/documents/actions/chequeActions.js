import * as actions from '../enums/chequeActions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

// Actions for list
export const getCheque = {
	request: (props) => createAction(actions.GET_CHEQUE.REQUEST, {...props}),
	success: (response) => createAction(actions.GET_CHEQUE.REQUEST, {response}),
	failure: (error) => createAction(actions.GET_CHEQUE.REQUEST, {error})
};