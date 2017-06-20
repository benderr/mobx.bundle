import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	error: null,
	success: null,
	stateIntegration: false,
	msLogin: '',
	msPassword: ''
});

export const actionHandlers = {

	[actions.GET_STATE_INTEGRATION.REQUEST]: state => {
		return state.merge({
			loading: true
		});
	},

	[actions.GET_STATE_INTEGRATION.SUCCESS]: (state, action) => {
		console.log('GetStateIntegration - success', action.response);
		return state.merge({
			loading: false,

			stateIntegration: true,
			msLogin: 'login@mail',
			msPassword: '***'

			// stateIntegration: action.response.msIntegrationEnabled,
			// msLogin: action.response.msLogin,
			// msPassword: action.response.msPassword
		});
	},

	[actions.GET_STATE_INTEGRATION.FAILURE]: (state, error) => {
		console.log('GetStateIntegration - failure', error);
		return state.merge({
			loading: true
		});
	},

	[actions.UPD_STATE_INTEGRATION]: (state, active) => {
		console.log('UpdStateIntegration', active);
		return state.merge({
			stateIntegration: active.stateIntegration
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
