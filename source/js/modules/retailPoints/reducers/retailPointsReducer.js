import {Map, fromJS} from 'immutable';
import {
	GET_RETAIL_POINTS, SET_RETAIL_POINT, ADD_RETAIL_POINT, EDIT_RETAIL_POINT,
	GET_RETAIL_POINT
} from '../enums/actions';

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

	[GET_RETAIL_POINT.REQUEST]: (state, action) => {
		return state.setIn(['retailPointInLayer', action.id],
			Map({
				loading: true,
			}));
	},

	[GET_RETAIL_POINT.SUCCESS]: (state, action) => {
		return state.setIn(['retailPointInLayer', action.response.id],
			Map({
				loading: false,
				retailPoint: fromJS(action.response),
				error: null
			}));
	},

	[GET_RETAIL_POINT.FAILURE]: (state, action) => {
		return state.setIn(['retailPointInLayer', action.id],
			Map({
				loading: false,
				retailPoint: null,
				error: fromJS(action.error)
			}));
	},

	[EDIT_RETAIL_POINT.REQUEST]: (state) => {
		return state.merge({
			loading: true
		});
	},

	[EDIT_RETAIL_POINT.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			retailPoints: state.get('retailPoints').merge(fromJS([action.response])),
		});
	},

	[EDIT_RETAIL_POINT.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: fromJS(action.error),
		});
	},
};
