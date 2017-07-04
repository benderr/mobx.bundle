import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	views: Map({})
});

export const actionHandlers = {
	[actions.OPEN_DETAIL_ITEM]: (state, {contragent}) => {
		console.log(actions.OPEN_DETAIL_ITEM, {contragent});

		return state.setIn(['views', contragent.code], Map({
			loading: false,
			errors: null,
			success: null,

			code: contragent.code,
			locked: contragent.locked,
			login: contragent.login,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
