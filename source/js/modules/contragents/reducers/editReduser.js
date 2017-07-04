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
		login: '',
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
			login: contragent.login,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	},

	[actions.CHANGE_ROLE]: (state, {isNew, contragentUpdate}) => {
		// const newRoles = [];
        //
		// console.log('1', actions.CHANGE_ROLE, {contragentCode, roleCode});
		// console.log('2', actions.CHANGE_ROLE, state.getIn(['viewItems', contragentCode, 'roles']));

		let schema
		return state.setIn(['newItem'], Map(contragentUpdate));

		// return state.setIn(['viewItems', contragentCode], Map({
		// 	loading: false,
		// 	errors: null,
		// 	success: null,
		// 	isPassword: false,
		// 	isPasswordRequired: false,
        //
		// 	code: contragent.code,
		// 	locked: contragent.locked,
		// 	login: contragent.login,
		// 	name: contragent.name,
		// 	password: contragent.password,
		// 	roles: List(contragent.roles)
		// }));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
