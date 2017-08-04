import {Map, List, fromJS} from 'immutable';
import * as actEnums from '../actions/contragentActions'


export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	// iRequest: 0,		// счетчик кол-во раз рагрузили список
	noItems: null,		// изначально неизвестно есть ли элементы
	countStep: 20,		// кол-во элементов зв звпрос (постраничная загрузка)

	// список
	list: List([]),
	pos: 0,				// сдвиг элементов на странице
	total_count: 0,		// всего элементов в БД

	// сортировка
	sortField: 'name',		// поле сортировки
	sortDirection: 'asc',		// направление сорт.

	q: '',				// параметры фильтра
	isCashier: false
});

export const actionHandlers = {
	[actEnums.GET_LIST.REQUEST]: (state, req) => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,

			sortField: req.sortField || state.get('sortField'),
			sortDirection: req.sortDirection || state.get('sortDirection'),
			q: req.q !== undefined ? req.q : state.get('q'),
			isCashier: req.isCashier !== undefined ? req.isCashier : state.get('isCashier')
		});
	},
	[actEnums.GET_LIST.SUCCESS]: (state, res) => {
		const arList = res.pos ? state.get('list').concat(fromJS(res.list)) : List(res.list);
		return state.merge({
			loading: false,
			errors: null,
			success: true,

			list: arList,
			pos: res.pos,
			total_count: res.total_count,

			noItems: res.noItems
		});
	},
	[actEnums.GET_LIST.FAILURE]: (state, request) => {
		return state.merge({
			loading: false,
			errors: true,
			success: null
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
