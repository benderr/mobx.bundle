import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const register = {
	request: (user) => createAction(actions.REGISTER.REQUEST, {user}),
	success: (response) => createAction(actions.REGISTER.SUCCESS, {response}),
	failure: (error) => createAction(actions.REGISTER.FAILURE, {error})
};

export const forgot = {
	request: (email) => createAction(actions.FORGOT.REQUEST, {email}),
	success: (response) => createAction(actions.FORGOT.SUCCESS, {response}),
	failure: (error) => createAction(actions.FORGOT.FAILURE, {error})
};

export const changePassword = {
	request: ({oldPassword, newPassword}) => createAction(actions.CHANGE_PASSWORD.REQUEST, {oldPassword, newPassword}),
	success: (response) => createAction(actions.CHANGE_PASSWORD.SUCCESS, {response}),
	failure: (error) => createAction(actions.CHANGE_PASSWORD.FAILURE, {error})
};

export const updStateIntegration = {
	active: ({stateIntegration}) => createAction(actions.UPD_STATE_INTEGRATION, {stateIntegration})
};

export const getStateIntegration = {
	request: () => createAction(actions.GET_STATE_INTEGRATION.REQUEST),
	success: (response) => createAction(actions.GET_STATE_INTEGRATION.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_STATE_INTEGRATION.FAILURE, {error})
};

export const connectIntegration = {
	request: ({msLogin, msPassword}) => createAction(actions.CONNECT_INTEGRATION.REQUEST, {msLogin, msPassword}),
	success: () => createAction(actions.CONNECT_INTEGRATION.SUCCESS, {}),
	failure: (error) => createAction(actions.CONNECT_INTEGRATION.FAILURE, {error})
};