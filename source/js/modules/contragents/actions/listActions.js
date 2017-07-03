import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const getList = {
	request: ({q, column, orderBy, start}) => createAction(actions.GET_LIST.REQUEST, {q, column, orderBy, start}),
	success: (response) => createAction(actions.GET_LIST.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_LIST.FAILURE, {error})
};