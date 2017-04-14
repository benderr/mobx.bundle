import {LOGIN, LOGOUT, LOGIN_CANCEL} from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const login = {
	request: (email, pass) => createAction(LOGIN.REQUEST, {email, pass}),
	success: (response) => createAction(LOGIN.SUCCESS, {response}),
	failure: (error) => createAction(LOGIN.FAILURE, {error})
};

export const logOut = () => createAction(LOGOUT);

export const loginCancel = () => createAction(LOGIN_CANCEL);
