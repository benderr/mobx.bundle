import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';
import {DEFAULT_COLOR, HOT_KEY_TYPE} from '../enums/enums'
import {uuid} from 'infrastructure/utils/uuidGenerator'

export default {
	[actions.ADD_KEY]: (state, {cords, tabCode}) => {
		return state.setIn(['selectedKey'], fromJS({
			id: '',
			tabCode: tabCode,
			color: DEFAULT_COLOR,
			row: cords.row,
			col: cords.col,
			width: 1,
			height: 1,
			type: HOT_KEY_TYPE.PRODUCT
		}))
	},
	[actions.SELECT_KEY]: (state, {id}) => {
		return state.setIn(['selectedKey'], state.getIn(['keysList', id]));
	},
	[actions.CANCEL_KEY]: (state) => {
		return state.deleteIn(['selectedKey']);
	},
	[actions.REMOVE_KEY]: (state, {key}) => {
		return state.deleteIn(['selectedKey'])
			.deleteIn(['keysActive', key])
			.deleteIn(['keysList', key]);
	},

	[actions.UPDATE_SELECTED_KEY]: (state, {key}) => {
		return state.updateIn(['selectedKey'], k => k.merge(fromJS(key)));
	},
	[actions.SAVE_KEY]: (state, {key}) => {
		if (key.id) {
			const keyObj = fromJS(key);
			return state.update('selectedKey', () => null)
				.updateIn(['keysActive', key.id], k => k.merge(keyObj))
				.updateIn(['keysList', key.id], k => k.merge(keyObj));
		} else {
			const id = uuid();
			let keyNew = {...key};
			keyNew.id = id;
			keyNew = fromJS(keyNew);
			return state.update('selectedKey', () => null)
				.setIn(['keysActive', id], keyNew)
				.setIn(['keysList', id], keyNew);
		}
	},
	[actions.SEARCH_PRODUCT.REQUEST]: (state) => {
		return state.updateIn(['searchProductsResult', 'loading'], true, _ => true);
	},
	[actions.SEARCH_PRODUCT.SUCCESS]: (state, {products}) => {
		return state.updateIn(['searchProductsResult'], data => data.merge({
			loading: false,
			products: fromJS(products),
			error: null
		}));
	},
	[actions.SEARCH_PRODUCT.FAILURE]: (state, {error}) => {
		return state.updateIn(['searchProductsResult'], data => data.merge({
			loading: false,
			error: fromJS(error)
		}));
	},
	[actions.SEARCH_CATEGORY.REQUEST]: (state) => {
		return state.updateIn(['searchGroupsResult', 'loading'], true, _ => true);
	},
	[actions.SEARCH_CATEGORY.SUCCESS]: (state, {categories}) => {
		return state.updateIn(['searchGroupsResult'], data => data.merge({
			loading: false,
			categories: fromJS(categories),
			error: null
		}));
	},
	[actions.SEARCH_CATEGORY.FAILURE]: (state, {error}) => {
		return state.updateIn(['searchGroupsResult'], data => data.merge({
			loading: false,
			error: fromJS(error)
		}));
	},
	[actions.SET_CATEGORY_KEYS]: (state, {keys, finish}) => {
		return state.merge({
			loadingProducts: !finish,
			keysActive: fromJS(keys)
		});
	},
	[actions.OPEN_CATEGORY]: (state) => {
		return state.merge({loadingProducts: true});
	}
};
