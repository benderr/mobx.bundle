import {Map} from 'immutable';
import {LOGIN, LOGOUT, CHECKING_ACCESS_STOP, CHECKING_ACCESS_START} from '../enums/actions';

export const initialState = Map({
	loading: false,
	authError: null,
	authData: null,
	appReady: false
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
	},

	[CHECKING_ACCESS_START]: (state, action) => {
		return state.merge({appReady: false});
	},

	[CHECKING_ACCESS_STOP]: (state, action) => {
		return state.merge({appReady: true});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
