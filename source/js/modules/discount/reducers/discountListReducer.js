import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: true,
	errors: null,
	success: null,
	iRequest: 0,
	noItem: '',

	// список
	list: List([]),
	pos: 0,
	total_count: 0,

	// сортировка
	column: 'name',
	orderBy: 'asc',

	// параметры фильтра
	q: ''
});

export const actionHandlers = {
	// ...при изменении размера списка
	[actions.CREATE.SUCCESS]: (state) => {
		return !state.get('list').size ? state.merge({iRequest: 0, noItem: ''}) : state;
	},
	[actions.DELETE.SUCCESS]: (state) => {
		return state.get('list').size == 1 ? state.merge({iRequest: 0, noItem: ''}) : state;
	},

	// Список элементов
	[actions.GET_LIST.REQUEST]: (state, props) => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,

			noItem: state.get('noItem'),
			iRequest: state.get('iRequest') + 1,

			column: props.column || initialState.get('column'),
			orderBy: props.orderBy || initialState.get('orderBy'),

			q: props.q || initialState.get('q')
		})
	},
	[actions.GET_LIST.SUCCESS]: (state, {response}) => {

		let noItem = state.get('noItem') === ''
			? !(state.get('iRequest') === 1 && response.data.length > 0)
			: state.get('noItem');

		return state.merge({
			loading: false,
			errors: null,
			success: null,
			noItem: noItem,

			list: List(response.data),
			pos: response.pos,
			total_count: response.total_count
		})
	},
	[actions.GET_LIST.FAILURE]: (state, {error}) => {
		return state.merge({
			loading: false,
			errors: fromJS(error),
			success: null
		});
	}
};