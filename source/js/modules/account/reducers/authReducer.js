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

	[LOGOUT]: (state, action) => {
		return state.merge({
			loading: false,
			authError: null,
			authData: null
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
