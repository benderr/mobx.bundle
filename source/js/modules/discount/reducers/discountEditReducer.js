import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	newItem: Map({
		loading: false,
		errors: null,
		success: null,

		name: '',
		value: ''
	}),
	listItem: Map({})
});

export const actionHandlers = {
	// При открытие детального просмотра из списка
	[actions.OPEN_FROM_LIST]: (state, {discount}) => {
		return state.setIn(['listItem', discount.code], Map({
			code: discount.code,
			name: discount.name,
			value: discount.value
		}));
	},

	// Очистить стайт формы перед закрытием слоя
	[actions.CLOSE_LAYER]: (state, {isNew, formState}) => {
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
	[actions.CREATE.FAILURE]: (state, {error}) => {
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
	[actions.UPDATE.FAILURE]: (state, {error, discount}) => {
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
	}
};