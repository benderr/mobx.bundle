import {Map} from 'immutable';
import {GET_RETAIL_POINTS, SET_RETAIL_POINT} from '../enums/actions'

export const initialState = Map({
	loading: false,
	retailPoints: [],
	selectedPoint: null,
	error: null
});

export const actionHandlers = {

	[GET_RETAIL_POINTS.REQUEST]: (state) => {
		return state.merge({
			loading: true
		});
	},

	[SET_RETAIL_POINT]: (state, action) => {
		return state.merge({
			selectedPoint: action.point
		});
	},

	[GET_RETAIL_POINTS.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			retailPoints: action.response
		});
	},

	[GET_RETAIL_POINTS.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: action.error,
			retailPoints: []
		});
	},
};

export default (createReducer) => createReducer(initialState, actionHandlers);
