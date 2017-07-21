import {Map, List, fromJS} from 'immutable';

import * as chequeActions from '../enums/chequeActions';


export const initialState = Map({
	loading: false,
	success: null,
	error: null,

	list: List([]),			// список элементов
	details: Map({}),		// детальный просмотр элементов

	// постраничная навигация
	pos: 0,					// сдвиг элементов на странице
	total_count: 0,			// всего элементов в БД

	// сортировка
	sortField: 'name',		// поле сортировки
	sortDirection: 'asc',	// направление сортировки

	// поиск и фильтр
	isFilter: false,		// флаг применения фильтра
	q: ''					// строка поиска
});

export const actionHandlers = {
	// получение списка элементов
	[chequeActions.GET_CHEQUE.REQUEST]: (state) => {
		return state;
	},
	[chequeActions.GET_CHEQUE.SUCCESS]: (state) => {
		return state;
	},
	[chequeActions.GET_CHEQUE.FAILURE]: (state) => {
		return state;
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
