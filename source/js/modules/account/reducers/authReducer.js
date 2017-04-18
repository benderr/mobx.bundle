import {Map} from 'immutable';
import {LOGIN, LOGOUT, LOGIN_INFO} from '../enums/actions'

export const initialState = Map({
	loading: false,
	authError: null,
	authData: null
});


export const actionHandlers = {

	[LOGIN.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			authError: null,
			authData: null
		});
	},

	[LOGIN.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			authError: null,
			authData: action.response
		});
	},

	[LOGIN.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			authError: action.error,
			authData: null
		});
	},

	[LOGIN_INFO.REQUEST]: (state) => {
		return state.merge({
			profileError: null,
			profile: null
		});
	},

	[LOGIN_INFO.SUCCESS]: (state, action) => {
		return state.merge({
			profileError: null,
			profile: action.response
		});
	},

	[LOGIN_INFO.FAILURE]: (state, action) => {
		return state.merge({
			profileError: null,
			profile: null
		});
	},

	[LOGOUT]: (state, action) => {
		return state.merge({
			loading: false,
			authError: null,
			authData: null
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
