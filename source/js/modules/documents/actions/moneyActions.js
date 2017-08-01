import {createAction} from "infrastructure/helpers/actionHelpers";
import {createRequestTypes} from "infrastructure/helpers/actionHelpers";

// Enums
export const GET_MONEY = createRequestTypes("DOCUMENTS_MONEY.GET_MONEY");
export const SET_FILTER = 'DOCUMENTS_MONEY.SET_FILTER';


// Actions
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
export const setFilterProps = (props) => createAction(SET_FILTER, props);