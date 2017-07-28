import {Map, List, fromJS} from 'immutable'
import logger from 'infrastructure/utils/logger'
import * as enums from '../actions/moneyActions'


export const initialState = Map({
	loading: true,
	success: null,
	error: null,

	list: List([]),

	// постраничная навигация
	pos: 0,
	total_count: 0,
	listStep: 50,				//
	noItems: null,				// наличие элементов в БД (без фильтра)

	// сортировка
	sortField: 'beginDateTime',	// поле сортировки
	sortDirection: 'desc',		// направление сортировки

	// поиск
	q: ''						// строка поиска
});

export const actionHandlers = {
	[enums.GET_MONEY.REQUEST]: (state, props) => {
		return state.merge({
			loading: true,
			success: null,
			error: null,

			sortField: props.sortField || initialState.get('sortField'),
			sortDirection: props.sortDirection || initialState.get('sortDirection'),
			pos: props.pos || initialState.get('pos'),

			q: props.q || initialState.get('q')
		});
	},
	[enums.GET_MONEY.SUCCESS]: (state, {pos, totalCount, list, isFirst}) => {
		// бесконечный скроллинг
		let arList = pos ? state.get('list').concat(fromJS(list)) : List(list);

		return state.merge({
			loading: false,

			noItems: isFirst && !list.length,

			pos,
			total_count: totalCount,
			list: arList
		});
	},
	[enums.GET_MONEY.FAILURE]: (state, {error}) => {
		return state;
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);