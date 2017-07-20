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
		return state.setIn([contragent.code], Map({
			loading: false,
			errors: null,
			success: null,

			code: contragent.code,
			name: contragent.name,
			password: contragent.password,
			locked: contragent.locked,
			roles: List(fromJS(contragent.roles))
		}));
	},

	[actions.LOAD_DETAIL]: (state, {code}) => {
		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null,

			code: code,
			name: '',
			password: '',
			locked: 'off',
			roles: List(fromJS([]))
		}));
	},

	// создание нового контрагента
	[actions.CREATE.REQUEST]: (state) => {
		return state.setIn(['newItem', 'loading'], true);
	},
	[actions.CREATE.SUCCESS]: (state) => {
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			password: '',
			locked: 'off',
			roles: List(fromJS([]))
		}));
	},

	// обновление контрагента
	[actions.UPDATE.REQUEST]: (state, {contragent}) => {
		return state.setIn([contragent.code, 'loading'], true);
	},
	[actions.UPDATE.SUCCESS]: (state, {code}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: true
		}));
	},

	// удаление контрагента
	[actions.DELETE.REQUEST]: (state, {code}) => {
		return state.setIn([code, 'loading'], true);
	},
	[actions.DELETE.SUCCESS]: (state, {code}) => {
		return state.setIn([code], Map({
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