import {Map, List, fromJS} from 'immutable';

import * as chequeActions from '../enums/chequeActions';


export const initialState = Map({
	loading: true,
	success: null,
	error: null,

	list: List([]),			// список элементов
	details: Map({}),		// детальный просмотр элементов

	// постраничная навигация
	pos: 0,					// сдвиг элементов на странице
	total_count: 0,			// всего элементов в БД
	listStep: 50,			// кол-во элементов за раз
	noItems: null,

	// сортировка
	sortField: 'beginDateTime',	// поле сортировки
	sortDirection: 'desc',		// направление сортировки

	// поиск и фильтр
	isFilter: false,		// флаг применения фильтра
	q: ''					// строка поиска
});

export const actionHandlers = {
	// получение списка элементов
	[chequeActions.GET_CHEQUE.REQUEST]: (state, props) => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,

			// noItems: isFirst && totalCount == 0,
			// iRequest: state.get('iRequest') + 1,

			sortField: props.sortField || initialState.get('sortField'),
			sortDirection: props.sortDirection || initialState.get('sortDirection'),
			pos: props.pos || initialState.get('pos'),

			q: props.q || initialState.get('q')
		})
	},
	[chequeActions.GET_CHEQUE.SUCCESS]: (state, {pos, totalCount, list, isFirst}) => {
		console.log(chequeActions.GET_CHEQUE.SUCCESS, {pos, totalCount, list, isFirst});

		// бесконечный скроллинг
		let arList = pos ? state.get('list').concat(fromJS(list)) : List(list);

		return state.merge({
			loading: false,

			noItems: isFirst && list.length == 0,

			pos,
			total_count: totalCount,
			list: arList
		});
	},
	[chequeActions.GET_CHEQUE.FAILURE]: (state) => {
		console.log(chequeActions.GET_CHEQUE.FAILURE, {error});
		return state;
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
