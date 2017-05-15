/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import {Map} from 'immutable';
import {GET_RETAIL_POINT} from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	retailPoint: null
});

export const actionHandlers = {

	[GET_RETAIL_POINT.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			error: null,
			retailPoint: null
		});
	},

	[GET_RETAIL_POINT.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			error: null,
			retailPoint: action.response
		});
	},

	[GET_RETAIL_POINT.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			error: action.error,
			retailPoint: null
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);