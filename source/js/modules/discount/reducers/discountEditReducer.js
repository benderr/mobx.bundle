import {Map, List, fromJS} from 'immutable';
import * as actEnums from '../actions/discountActions'

export const initialState = Map({
	'newItem': Map({
		loading: false,
		errors: null,
		success: null,

		name: '',
		value: ''
	})
});

export const actionHandlers = {
	[actEnums.OPEN_FROM_STATE]: (state, {code, ...discount}) => {
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value
		}))
	},

	[actEnums.EDIT_DISCOUNT.REQUEST]: (state, {code, ...discount}) => {

		console.log('EDIT_DISCOUNT.REQUEST', discount);

		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null,

			name: discount.name,
			value: discount.value
		}));
	},
	[actEnums.EDIT_DISCOUNT.SUCCESS]: (state, {code, ...discount}) => {
		console.log(actEnums.EDIT_DISCOUNT.SUCCESS, discount);
		return state.setIn([code], Map({
			loading: false,
			errors: null,
			success: true,

			name: discount.name || '',
			value: discount.value || ''
		}));
	},
	[actEnums.EDIT_DISCOUNT.FAILURE]: (state, code) => {

		console.log('EDIT_DISCOUNT.FAILURE', code);

		return state.setIn([code], Map({
			loading: false,
			errors: true,
			success: null
		}));
	},

	[actEnums.DELETE_DISCOUNT]: (state, {code}) => {

		console.log(actEnums.DELETE_DISCOUNT, code);

		return state.setIn([code], Map({
			loading: true,
			errors: null,
			success: null
		}));
	}


	// // При открытие детального просмотра из списка
	// [actions.OPEN_FROM_LIST]: (state, {discount}) => {
	// 	return state.setIn(['listItem', discount.code], Map({
	// 		loading: false,
	// 		success: null,
	// 		errors: true,
    //
	// 		code: discount.code,
	// 		name: discount.name,
	// 		value: discount.value
	// 	}));
	// },
    //
	// // Очистить стайт формы перед закрытием слоя
	// [actions.CLOSE_LAYER]: (state, {isNew, formState}) => {
	// 	let nested = isNew ? ['newItem'] : ['listItem', formState.code];
	// 	return state.setIn(nested, Map({
	// 		loading: false,
	// 		errors: null,
	// 		success: null
	// 	}));
	// },
    //
	// // При создании новой скидки
	// [actions.CREATE.REQUEST]: (state, {discount}) => {
	// 	return state.setIn(['newItem'], Map({
	// 		loading: true,
	// 		errors: null,
	// 		success: null,
    //
	// 		name: discount.name,
	// 		value: discount.value
	// 	}))
	// },
	// [actions.CREATE.SUCCESS]: (state) => {
	// 	return state.setIn(['newItem'], Map({
	// 		loading: false,
	// 		errors: null,
	// 		success: true,
    //
	// 		name: '',
	// 		value: ''
	// 	}))
	// },
	// [actions.CREATE.FAILURE]: (state) => {
	// 	return state.setIn(['newItem'], Map({
	// 		loading: false,
	// 		errors: true,
	// 		success: null
	// 	}))
	// },
    //
	// // При обновлении скидки
	// [actions.UPDATE.REQUEST]: (state, {discount}) => {
	// 	return state.setIn(['listItem', discount.code], Map({
	// 		loading: true,
	// 		errors: null,
	// 		success: null,
    //
	// 		name: discount.name,
	// 		value: discount.value
	// 	}))
	// },
	// [actions.UPDATE.SUCCESS]: (state, {discount}) => {
	// 	return state.setIn(['listItem', discount.code], Map({
	// 		loading: false,
	// 		errors: null,
	// 		success: true,
    //
	// 		name: '',
	// 		value: ''
	// 	}))
	// },
	// [actions.UPDATE.FAILURE]: (state, {discount}) => {
	// 	return state.setIn(['listItem', discount.code], Map({
	// 		loading: false,
	// 		errors: true,
	// 		success: null
	// 	}))
	// },
    //
	// // Успешное удаление элемента списка
	// [actions.DELETE.SUCCESS]: (state, {code}) => {
	// 	return state.setIn(['listItem', code], Map({
	// 		loading: false,
	// 		errors: null,
	// 		success: true,
    //
	// 		name: '',
	// 		value: ''
	// 	}))
	// },
    //
	// // дополнительная завгрузка элемента - детальный просмотр
	// [actions.LOAD_DETAIL.REQUEST]: (state, {code}) => {
	// 	return state.setIn(['listItem', code], Map({
	// 		loading: true,
	// 		success: null,
	// 		errors: null
	// 	}))
	// }
};