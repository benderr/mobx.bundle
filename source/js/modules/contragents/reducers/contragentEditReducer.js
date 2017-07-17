import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	'12312': Map({
		loading: true,
		errors: null,
		success: null,

		roles: List(fromJS(['CASHIER', 'EMPLOYEE', 'ADMINISTRATOR']))
	})
});

export const actionHandlers = {
	[actions.OPEN_FROM_LIST]: (state, {contragent}) => {
		console.log(actions.OPEN_FROM_LIST, contragent);
		return state;
	}
};