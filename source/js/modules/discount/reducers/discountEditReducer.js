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
		console.log(actions.CREATE.REQUEST, discount);
		return state.setIn(['newItem'], Map({
			loading: true,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value
		}))
	},
	[actions.CREATE.SUCCESS]: (state) => {
		console.log(actions.CREATE.SUCCESS);
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: null,
			success: true,

			name: '',
			value: ''
		}))
	},
	[actions.CREATE.FAILURE]: (state, {error}) => {
		console.log(actions.CREATE.FAILURE, error);
		return state.setIn(['newItem'], Map({
			loading: false,
			errors: true,
			success: null
		}))
	},

	// Удаление элемента списка
	[actions.DELETE.REQUEST]: (state, {code}) => {
		console.log(actions.DELETE.REQUEST, {code});
		return state;
	},
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