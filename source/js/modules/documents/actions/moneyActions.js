import {createAction} from "infrastructure/helpers/actionHelpers";
import {createRequestTypes} from "infrastructure/helpers/actionHelpers";


export const GET_MONEY = createRequestTypes("DOCUMENTS.GET_MONEY");


export const getMoney = {
	request: (props) => createAction(GET_MONEY.REQUEST, {...props}),
	success: ({pos, totalCount, list, isFirst}) => createAction(GET_MONEY.SUCCESS, {
		pos,
		totalCount,
		list,
		isFirst
	}),
	failure: (error) => createAction(GET_MONEY.FAILURE, {error})
};