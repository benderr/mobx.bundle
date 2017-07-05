import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';
import * as options from '../enums/contragentOptions';

export const initialState = Map({
	newItem: {
		loading: false,
		errors: null,
		success: null,
		isPassword: false,
		isPasswordRequired: false,

		code: 'new',
		locked: 'off',
		name: '',
		password: '',
		roles: List([])
	},
	viewItems: Map({})
});

export const actionHandlers = {
	[actions.OPEN_DETAIL_ITEM]: (state, {contragent}) => {
		console.log(actions.OPEN_DETAIL_ITEM, {contragent});

		return state.setIn(['viewItems', contragent.code], Map({
			loading: false,
			errors: null,
			success: null,
			isPassword: false,
			isPasswordRequired: false,

			code: contragent.code,
			locked: contragent.locked,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	},

	[actions.CREATE_CONTRAGENT.REQUEST]: (state, {contragent}) => {
		console.log(actions.CREATE_CONTRAGENT.REQUEST, contragent);

		return state.setIn(['newItem'], Map({
			loading: true,
			locked: contragent.locked,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	},
	[actions.CREATE_CONTRAGENT.SUCCESS]: (state, {data}) => {

	},
	[actions.CREATE_CONTRAGENT.FAILURE]: (state, {data}) => {

	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
