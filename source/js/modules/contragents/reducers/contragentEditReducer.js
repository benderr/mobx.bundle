import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	'newItem': Map({
		loading: false,
		errors: null,
		success: null,

		name: '',
		password: '',
		locked: 'off',
		roles: List(fromJS([]))
	})
});

export const actionHandlers = {
	[actions.OPEN_FROM_LIST]: (state, {contragent}) => {
		console.log(actions.OPEN_FROM_LIST, contragent);
		return state;
	},

	// создание нового контрагента
	[actions.CREATE.REQUEST]: (state, {contragent}) => {
		return state.setIn(['newItem', 'loading'], true);
	},
	[actions.CREATE.SUCCESS]: (state) => {
		console.log(actions.CREATE.SUCCESS);
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			password: '',
			locked: 'off',
			roles: List(fromJS([]))
		}));
	}
};