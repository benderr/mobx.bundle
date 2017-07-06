import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';
import * as options from '../enums/contragentOptions';

export const initialState = Map({
	newItem: Map({
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
	}),
	viewItems: Map({})
});

export const actionHandlers = {
	[actions.OPEN_DETAIL_ITEM]: (state, {contragent}) => {
		return state.setIn(['viewItems', contragent.code], Map({
			loading: false,
			errors: null,
			success: null,
			isPassword: isPasswordRole(contragent.roles),
			isPasswordRequired: isPasswordRequiredRole(contragent.roles),

			code: contragent.code,
			locked: contragent.locked,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	},

	[actions.CHANGE_ROLE]: (state, {roles, code}) => {
		console.log(actions.CHANGE_ROLE, {roles, code}, state.toJS());
		let nested = !code ? ['newItem'] : ['viewItems', code];
		return state.updateIn(nested, view => view.merge(fromJS({
			isPassword: isPasswordRole(roles),
			isPasswordRequired: isPasswordRequiredRole(roles),
			roles: List(roles)
		})));
	},

	[actions.CREATE_CONTRAGENT.REQUEST]: (state, {contragent}) => {
		console.log(actions.CREATE_CONTRAGENT.REQUEST, contragent);
		return state.updateIn(['newItem'], view => view.merge(fromJS({
			loading: true,
			locked: contragent.locked,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		})));
	},
	[actions.UPDATE_CONTRAGENT.REQUEST]: (state, {contragent, code}) => {
		console.log(actions.UPDATE_CONTRAGENT.REQUEST, {contragent, code});
		return state.updateIn(['viewItems', code], view => view.merge(fromJS({
			loading: true,
			locked: contragent.locked,
			name: contragent.name,
			password: contragent.password,
			roles: List(contragent.roles)
		})));
	},

	[actions.CREATE_CONTRAGENT.SUCCESS]: (state) => {
		console.log(actions.CREATE_CONTRAGENT.SUCCESS);
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: null,
			success: true,
			isPassword: false,
			isPasswordRequired: false,

			code: 'new',
			locked: 'off',
			name: '',
			password: '',
			roles: List([])
		}))
	}
};

function isPasswordRole(roles) {
	return roles.some(role => options.roles[role].password);
}
function isPasswordRequiredRole(roles) {
	return roles.some(role => options.roles[role].passwordRequired);
}

export default (createReducer) => createReducer(initialState, actionHandlers);
