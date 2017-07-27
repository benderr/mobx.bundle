import {Map, List, fromJS} from 'immutable';
import * as actions from '../enums/actions';
import {DEFAULT_COLOR, HOT_KEY_TYPE} from '../enums/enums'
import {uuid} from 'infrastructure/utils/uuidGenerator'
import createRequestReducer from 'modules/core/reducers/createRequestReducer'

const searchProductReducer = createRequestReducer(actions.SEARCH_PRODUCT, ['searchProductsResult'])
	.setRequest((data) => data.merge({loading: true}))
	.setFailure((data, {error}) => data.merge({
		loading: false,
		error: fromJS(error)
	}))
	.setSuccess((data, {products}) => data.merge({
		loading: false,
		products: fromJS(products),
		error: null
	}))
	.get();

export default {
	[actions.ADD_KEY]: (state, {cords, tabCode}) => {
		return state.setIn(['selectedKey'], fromJS({
			tabCode: tabCode,
			color: DEFAULT_COLOR,
			row: cords.row,
			col: cords.col,
			width: 1,
			height: 1,
			type: HOT_KEY_TYPE.PRODUCT,
			tempId: cords.tempId
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
		key.tempId = null;
		if (!key.id) {
			key.id = uuid();
			const keyObj1 = fromJS(key);
			return state.update('selectedKey', () => null)
				.setIn(['keysActive', key.id], keyObj1)
				.setIn(['keysList', key.id], keyObj1);
		} else {
			const keyObj2 = fromJS(key);
			return state.update('selectedKey', () => null)
				.mergeIn(['keysActive', key.id], keyObj2)
				.mergeIn(['keysList', key.id], keyObj2);
		}


	},

	...searchProductReducer,

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
			freezeMode: true,
			loadingProducts: !finish,
			keysActive: fromJS(keys)
		});
	},
	[actions.OPEN_CATEGORY]: (state) => {
		return state.merge({
			freezeMode: true,
			loadingProducts: true
		});
	},
	[actions.BACK_FROM_CATEGORY]: (state) => {
		return state.merge({
			freezeMode: false
		});
	}
};
