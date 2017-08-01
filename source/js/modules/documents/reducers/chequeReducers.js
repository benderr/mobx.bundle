import {Map, List, fromJS} from 'immutable';
import * as enums from '../actions/chequeActions';


export const initialState = Map({
	loading: true,
	success: null,
	error: null,

	list: List([]),				// список элементов
	details: Map({}),			// детальный просмотр элементов

	// постраничная навигация
	pos: 0,						// сдвиг элементов на странице
	total_count: 0,				// всего элементов в БД
	listStep: 50,				// кол-во элементов за раз
	noItems: null,

	// сортировка
	sortField: 'beginDateTime',	// поле сортировки
	sortDirection: 'desc',		// направление сортировки

	// поиск и фильтр
	q: '',						// строка поиска
	isFilter: false,			// флаг применения фильтра

	docsFilter: Map({
		dateFrom: null,		// дата От
		dateTo: null,			// дата До
		docType: []
	})
});

export const actionHandlers = {
	// получение списка элементов
	[enums.GET_CHEQUE.REQUEST]: (state, props) => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,

			sortField: props.sortField || initialState.get('sortField'),
			sortDirection: props.sortDirection || initialState.get('sortDirection'),
			pos: props.pos || initialState.get('pos'),

			q: props.q || initialState.get('q')
		})
	},
	[enums.GET_CHEQUE.SUCCESS]: (state, {pos, totalCount, list, isFirst}) => {
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
	[enums.GET_CHEQUE.FAILURE]: (state) => {
		console.log(enums.GET_CHEQUE.FAILURE, {error});
		return state;
	},

	// Установка параметров фильтра
	[enums.SET_FILTER]: (state, props) => {
		console.log('>> ', enums.SET_FILTER);
		return state.mergeIn(['docsFilter'], fromJS(props));
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
