import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: true,
	errors: null,
	success: null,

	iRequest: 0,		// счетчик кол-во раз рагрузили список
	noItem: null,		// изначально неизвестно есть ли элементы
	listStep: 20,		// кол-во элементов зв звпрос (постраничная загрузка)

	// список
	list: List([]),
	pos: 0,				// сдвиг элементов на странице
	total_count: 0,		// всего элементов в БД

	// сортировка
	column: 'name',		// поле сортировки
	orderBy: 'asc',		// направление сорт.

	q: ''				// параметры фильтра
});

export const actionHandlers = {
	// ...при изменении размера списка (сбрасываем начальное состояние кол-во запросов)
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
			pos: props.pos || initialState.get('pos'),

			q: props.q || initialState.get('q')
		})
	},
	[actions.GET_LIST.SUCCESS]: (state, {response}) => {

		// если при первой загрузке (без фильтров) пришел результат - значит в БД есть скидки
		// иначе показываем страницу что скидок нет
		let noItem = state.get('noItem') === null
			? !(state.get('iRequest') === 1 && response.data.length > 0)
			: state.get('noItem');

		// бесконечный скроллинг
		let arList = response.pos ? state.get('list').concat(fromJS(response.data)) : List(response.data);

		return state.merge({
			loading: false,
			errors: null,
			success: null,
			noItem: noItem,

			list: arList,
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

export default (createReducer) => createReducer(initialState, actionHandlers);
