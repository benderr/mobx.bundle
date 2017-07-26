import * as enumsList from '../enums/moneyActions'
import {createAction} from "infrastructure/helpers/actionHelpers";

export const getMoney = {
	request: (props) => createAction(enumsList.GET_MONEY.REQUEST, {...props}),
	success: ({pos, totalCount, list, isFirst}) => createAction(enumsList.GET_MONEY.SUCCESS, {
		pos,
		totalCount,
		list,
		isFirst
	}),
	failure: (error) => createAction(enumsList.GET_MONEY.FAILURE, {error})
};