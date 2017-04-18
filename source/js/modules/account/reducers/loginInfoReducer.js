import {Map} from 'immutable';
import {LOGIN_INFO} from '../enums/actions'

export const initialState = Map({
	loading: false,
	profileError: null,
	profile: null
});


export const actionHandlers = {

	[LOGIN_INFO.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			profileError: null,
			profile: null
		});
	},

	[LOGIN_INFO.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			profileError: null,
			profile: action.response
		});
	},

	[LOGIN_INFO.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			profileError: action.error,
			profile: null
		});
	}
};

export default (createReducer) => createReducer(initialState, actionHandlers);
