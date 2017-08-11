import {Map, fromJS} from 'immutable';
import * as actions from '../enums/actions';

export const initialState = Map({
	loading: false,
	connectErrors: null,
	success: null,
	checked: false,
	stateIntegration: false,
	msLogin: '',
	msPassword: '',
	stateErrors: null
});

export const actionHandlers = {

	// начальное состояние подключения интеграции с МойСклад
	[actions.GET_STATE_INTEGRATION.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			connectErrors: null,
			stateErrors: null,
			success: null,
			checked: false,
			stateIntegration: false,
			msLogin: '',
			msPassword: '',
			disableStateErrors: null
		});
	},
	[actions.GET_STATE_INTEGRATION.SUCCESS]: (state, action) => {
		return state.merge({
			loading: false,
			success: null,
			checked: false,
			stateErrors: null,
			stateIntegration: action.response.msIntegrationEnabled,
			msLogin: action.response.msLogin,
			msPassword: ''
		});
	},
	[actions.GET_STATE_INTEGRATION.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			stateErrors: fromJS(action.error),
			success: null,
			checked: false,
			stateIntegration: false,
			msLogin: '',
			msPassword: ''
		});
	},

	// показать/скрыть форму ввода логина и пароля
	[actions.UPDATE_STATE_INTEGRATION]: (state, active) => {
		return state.merge({
			loading: false,
			connectErrors: null,
			success: null,
			stateErrors: null,
			checked: false,
			stateIntegration: active.stateIntegration,
			disableStateErrors: null
		});
	},

	// закроект все оповещения в форме
	[actions.DEFAULT_STATE_INTEGRATION]: (state) => {
		return state.merge({
			loading: false,
			connectErrors: null,
			success: null,
			checked: false,
			stateErrors: null,
			disableStateErrors: null
		});
	},

	// проверка корректности логина и пароля для интеграции
	[actions.CONNECT_INTEGRATION.REQUEST]: (state, action) => {
		return state.merge({
			loading: true,
			connectErrors: null,
			success: null,
			checked: false,
			msLogin: action.msLogin,
			msPassword: action.msPassword
		});
	},
	[actions.CONNECT_INTEGRATION.SUCCESS]: (state) => {
		return state.merge({
			loading: false,
			connectErrors: null,
			success: false,
			checked: true
		});
	},
	[actions.CONNECT_INTEGRATION.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			success: false,
			connectErrors: fromJS(action.error),
			checked: false
		});
	},

	// подтверждение интеграции
	[actions.CONFIRM_INTEGRATION.REQUEST]: (state, action) => {
		return state.merge({
			loading: true,
			connectErrors: null,
			success: null,
			checked: false,
			msLogin: action.msLogin,
			msPassword: action.msPassword
		});
	},
	[actions.CONFIRM_INTEGRATION.SUCCESS]: (state) => {
		return state.merge({
			loading: false,
			connectErrors: null,
			success: true,
			checked: false,
			stateIntegration: true,
			msPassword: ''
		});
	},
	[actions.CONFIRM_INTEGRATION.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			connectErrors: fromJS(action.error),
			success: null,
			checked: false,
			stateIntegration: true,
			msPassword: ''
		});
	},

	// удаляет данные о интеграции
	[actions.DISABLE_INTEGRATION.REQUEST]: (state) => {
		return state.merge({
			loading: true,
			errors: null,
			stateErrors: null,
			disableStateErrors: null,
			connectErrors: null,
			success: null,
			checked: false,
			stateIntegration: false
		});
	},
	[actions.DISABLE_INTEGRATION.SUCCESS]: (state) => {
		return state.merge({
			loading: false,
			disableStateErrors: null,
			connectErrors: null,
			success: true,
			checked: false,
			stateErrors: null,
			stateIntegration: false,
			msLogin: '',
			msPassword: ''
		});
	},
	[actions.DISABLE_INTEGRATION.FAILURE]: (state, action) => {
		return state.merge({
			loading: false,
			disableStateErrors: fromJS(action.error),
			success: null,
			checked: false,
			stateIntegration: false
		});
	}

};

export default (createReducer) => createReducer(initialState, actionHandlers);
