import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	errors: null,
	success: null,
	checked: false,
	stateIntegration: false,
	msLogin: '',
	msPassword: ''
});

export const actionHandlers = {

	// начальное состояние подключения интеграции с МойСклад
	[actions.GET_STATE_INTEGRATION.REQUEST]: state => {
		return state.merge({
			loading: true,
			errors: null,
			success: null,
			checked: false,
			stateIntegration: false,
			msLogin: '',
			msPassword: ''
		});
	},
	[actions.GET_STATE_INTEGRATION.SUCCESS]: (state, action) => {
		console.log('GetStateIntegration - success', action.response);
		return state.merge({
			loading: false,
			errors: null,
			success: null,
			checked: false,
			stateIntegration: action.response.msIntegrationEnabled,
			msLogin: action.response.msLogin,
			msPassword: action.response.msPassword
		});
	},
	[actions.GET_STATE_INTEGRATION.FAILURE]: (state, error) => {
		console.log('GetStateIntegration - failure', error);
		return state.merge({
			loading: false,
			errors: null,
			success: null,
			checked: false,
			stateIntegration: false,
			msLogin: '',
			msPassword: ''
		});
	},

	// показать/скрыть форму ввода логина и пароля
	[actions.UPD_STATE_INTEGRATION]: (state, active) => {
		console.log('UpdStateIntegration', active);
		return state.merge({
			loading: false,
			errors: null,
			success: null,
			checked: false,
			stateIntegration: active.stateIntegration
		});
	},

	// проверка корректности логина и пароля для интеграции
	[actions.CONNECT_INTEGRATION.REQUEST]: (state) => {
		console.log('connectIntegration -> request');
		return state.merge({
			loading: true,
			errors: null,
			success: null,
			checked: false
		});
	},
	[actions.CONNECT_INTEGRATION.SUCCESS]: (state) => {
		console.log('connectIntegration -> success');
		return state.merge({
			loading: false,
			errors: null,
			success: true,
			checked: true
		});
	},
	[actions.CONNECT_INTEGRATION.FAILURE]: (state, action) => {
		console.log('connectIntegration -> failure');
		return state.merge({
			loading: false,
			success: false,
			errors: fromJS(action.error),
			checked: false
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
