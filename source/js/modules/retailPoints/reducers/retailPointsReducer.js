import {Map, fromJS} from 'immutable';
import {GET_RETAIL_POINTS, SET_RETAIL_POINT, ADD_RETAIL_POINT, SET_EMPTY_RETAIL_POINT_IN_LAYER} from '../enums/actions';
// import {getRetailPointList} from '../selectors/retailPointSelectors';

export const initialState = Map({
	loading: false,
	retailPoints: null,
	selectedPointId: null,
	error: null,
	retailPointInLayer: Map({}),
});

export const actionHandlers = {

	[GET_RETAIL_POINTS.REQUEST]: (state) => {
		return state.merge({
			loading: true
		});
	},

	[SET_RETAIL_POINT]: (state, action) => {
		return state.merge({
			selectedPointId: action.id
		});
	},

	[GET_RETAIL_POINTS.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			retailPoints: fromJS(action.response)
		});
	},

	[GET_RETAIL_POINTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
			retailPoints: []
		});
	},


	[ADD_RETAIL_POINT.REQUEST]: (state) => {
		return state.merge({
			loading: true
		});
	},

	[ADD_RETAIL_POINT.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			retailPoints: state.get('retailPoints').concat(fromJS([action.response])),
		});
	},

	[ADD_RETAIL_POINT.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
		});
	},

	[SET_EMPTY_RETAIL_POINT_IN_LAYER]: (state, action) => {
		let retailPoint = {
			name: null,
			address: null,
			phone: null,
			inn: null,
			kpp: null,
			mock: {
				enabled: null,
			},
			isFirstPoint: action.isFirstPoint,
			productsSource: 'BLANK', //Exists, Copy
		};
		return state.setIn(['retailPointInLayer'],
			Map({
				loading: false,
				retailPoint: fromJS(retailPoint),
				error: null
			}));
	}
};
