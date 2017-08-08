import {Map, fromJS} from 'immutable';
import {LOGIN, LOGOUT, CHECKING_ACCESS_STOP, CHECKING_ACCESS_START} from '../enums/actions';

export const initialState = Map({
	loading: false,
	authError: null,
	authData: null,
	appReady: false,
	token: null,
	logout: false
});

export const actionHandlers = {

	[LOGIN.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			authError: null,
			authData: null,
			token: null
		});
	},

	[LOGIN.SUCCESS]: (state, {profile, token}) => {
		return state.merge({
			//loading: false,
			authError: null,
			authData: fromJS(profile),
			token: token
		});
	},

	[LOGIN.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			authError: fromJS(action.error),
			authData: null,
			token: null
		});
	},

	[LOGOUT]: (state, action) => {
		return state.merge({logout: true});
	},

	[CHECKING_ACCESS_START]: (state, action) => {
		return state.merge({appReady: false});
	},

	[CHECKING_ACCESS_STOP]: (state, action) => {
		return state.merge({appReady: true});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
