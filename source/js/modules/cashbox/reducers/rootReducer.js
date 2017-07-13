import {Map, fromJS} from 'immutable'
import keysReducer from './keysReducer'
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	totalCount: 0,
	pos: 0,

	tabList: Map({}), //список всех табов
	keysList: Map({}), //список всех ключей
	tabActive: null, //редактируемая на данный момент таба
	keysActive: Map({}), //редактируемые на данный момент клавиши
	loadingProducts: false, //получение товаров для категории

	selectedKey: null, //выбранный ключ
	searchProductsResult: Map({}), //результаты поиска в выпадушке
	searchGroupsResult: Map({})
});

export const actionHandlers = {
	[actions.GET_HOT_KEYS.REQUEST]: (state, action) => {
		return state.merge({
			loading: true
		});
	},
	[actions.SET_TABS]: (state, {tabs, keys, totalCount, pos}) => {
		return state.merge({
			loading: false,
			error: null,
			tabList: fromJS(tabs),
			keysList: fromJS(keys),
			totalCount: totalCount,
			pos: pos
		});
	},
	[actions.GET_HOT_KEYS.FAILURE]: (state, {error}) => {
		return state.merge({
			loading: false,
			error: fromJS(error)
		});
	},
	[actions.SELECT_TAB]: (state, {code}) => {
		const activeTab = state.getIn(['tabList', code]);
		const hotKeys = state.getIn(['keysList']).filter(key => key.get('tabCode') === code);
		return state.merge({
			tabActive: activeTab,
			keysActive: hotKeys
		});
	},
	[actions.CREATE_TAB.REQUEST]: (state, {tab}) => {
		return state.updateIn(['tabList'], list => list.set(tab.code, fromJS(tab)));
	},
	[actions.REMOVE_TAB.REQUEST]: (state, {code}) => {
		return state.merge({
			removing: true,
			tabList: state.get('tabList').delete(code)
		});
	},

	[actions.REMOVE_TAB.SUCCESS]: (state, {code}) => {
		return state.merge({
			removing: false
		});
	},

	[actions.REMOVE_TAB.FAILURE]: (state, {error}) => {
		return state.merge({
			removing: false,
			error: fromJS(error)
		});
	},

	[actions.UPDATE_TAB]: (state, {tab}) => {
		return state.merge({
			tabList: state.get('tabList').updateIn([tab.code], t => t.merge(fromJS(tab))),
			tabActive: state.get('tabActive').merge(fromJS(tab))
		});
	},

	...keysReducer
};

export default (createReducer) => createReducer(initialState, actionHandlers);
