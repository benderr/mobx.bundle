import {Map, List, fromJS} from 'immutable'
import * as actions from '../enums/actions'
import * as options from '../enums/options'

export const initialState = Map({
	newItem: Map({
		loading: false,
		errors: null,
		success: null,
		isPassword: false,

		code: 'new',
		name: '',
		locked: 'off',
		login: '',
		password: '',
		roles: List([])
	}),
	listItem: Map({})
});

export const actionHandlers = {
	// При открытие детального просмотра из списка
	[actions.OPEN_FROM_LIST]: (state, {contragent}) => {
		return state.setIn(['listItem', contragent.code], Map({
			loading: false,
			success: null,
			errors: true,
			isPassword: isPasswordRole(contragent.roles),
			isPasswordRequired: isPasswordRequiredRole(contragent.roles),

			code: contragent.code,
			name: contragent.name,
			locked: contragent.locked,
			password: contragent.password,
			roles: List(contragent.roles)
		}));
	},

	// При переключении роли в форме контрагента
	[actions.CHANGE_ROLE]: (state, {roles, code}) => {
		let nested = !code ? ['newItem'] : ['listItem', code];
		return state.updateIn(nested, view => view.merge(fromJS({
			isPassword: isPasswordRole(roles),
			isPasswordRequired: isPasswordRequiredRole(roles),
			roles: List(roles)
		})));
	},

	// Очистить стайт формы перед закрытием слоя
	[actions.CLOSE_LAYER]: (state, {isNew, formState}) => {
		console.log(actions.CLOSE_LAYER, {isNew, formState})
		let nested = isNew ? ['newItem'] : ['listItem', formState.code];
		return state.setIn(nested, Map({
			loading: false,
			errors: null,
			success: null
		}));
	},

	// При создании новой скидки
	[actions.CREATE.REQUEST]: (state, {discount}) => {
		return state.setIn(['newItem'], Map({
			loading: true,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value
		}))
	},
	[actions.CREATE.SUCCESS]: (state) => {
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			value: ''
		}))
	},
	[actions.CREATE.FAILURE]: (state) => {
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: true,
			success: null
		}))
	},

	// При обновлении скидки
	[actions.UPDATE.REQUEST]: (state, {discount}) => {
		return state.setIn(['listItem', discount.code], Map({
			loading: true,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value
		}))
	},
	[actions.UPDATE.SUCCESS]: (state, {discount}) => {
		return state.setIn(['listItem', discount.code], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			value: ''
		}))
	},
	[actions.UPDATE.FAILURE]: (state, {discount}) => {
		return state.setIn(['listItem', discount.code], Map({
			loading: false,
			errors: true,
			success: null
		}))
	},

	// Успешное удаление элемента списка
	[actions.DELETE.SUCCESS]: (state, {code}) => {
		return state.setIn(['listItem', code], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			value: ''
		}))
	},

	// дополнительная завгрузка элемента - детальный просмотр
	[actions.LOAD_DETAIL.REQUEST]: (state, {code}) => {
		return state.setIn(['listItem', code], Map({
			loading: true,
			success: null,
			errors: null
		}))
	}
};

function isPasswordRole(roles) {
	return roles.some(role => options.roles[role].password);
}
function isPasswordRequiredRole(roles) {
	return roles.some(role => options.roles[role].passwordRequired);
}