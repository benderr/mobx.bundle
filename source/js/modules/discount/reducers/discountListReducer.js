import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	// список
	list: List([]),
	pos: 0,
	total_count: 0,

	// сортировка
	column: 'name',
	orderBy: 'asc'
});

export const actionHandlers = {
	// Список элементов
	[actions.GET_LIST.REQUEST]: (state, props) => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,

			column: props.column || initialState.get('column'),
			orderBy: props.orderBy || initialState.get('orderBy')
		})
	},
	[actions.GET_LIST.SUCCESS]: (state, response) => {
		return state.merge({
			loading: false,
			errors: null,
			success: null,

			list: List(response.data),
			pos: response.pos,
			total_count: response.total_count
		})
	},
	[actions.GET_LIST.FAILURE]: (state, {error}) => {
		console.log(actions.GET_LIST.FAILURE, {error});
		return state.merge({
			loading: false,
			errors: fromJS(error),
			success: null
		});
	}
};