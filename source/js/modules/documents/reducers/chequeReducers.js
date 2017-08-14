import {Map, List, fromJS} from 'immutable';
import * as actEnums from '../actions/chequeActions'


export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	filter: Map({			// параметры фильтра
		dateFrom: null,		// дата От
		dateTo: null,		// дата До
		docType: null
	}),

	noItems: null,			// изначально неизвестно есть ли элементы
	countStep: 20,			// кол-во элементов зв звпрос (постраничная загрузка)

	// список
	list: List([]),
	pos: 0,					// сдвиг элементов на странице
	total_count: 0,			// всего элементов в БД

	// сортировка
	sortField: 'beginDateTime',	// поле сортировки
	sortDirection: 'desc'		// направление сорт.
});

export const actionHandlers = {
	[actEnums.GET_LIST.REQUEST]: (state, req) => {
		let props = {};

		if (req.isFirst) {

		} else {
			props.sortField = req.sortField || state.get('sortField');
			props.sortDirection = req.sortDirection || state.get('sortDirection');
		}

		return state.merge({
			loading: true,
			errors: null,
			success: null,
			...props
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
	[actEnums.GET_LIST.FAILURE]: (state) => {
		return state.merge({
			loading: false,
			errors: true,
			success: null
		});
	},

	// установка параметров фильтра
	[actEnums.SET_FILTER_PARAMS]: (state, props) => {
		return state.mergeIn(['filter'], fromJS(props));
	}
};


export default (createReducer) => createReducer(initialState, actionHandlers);