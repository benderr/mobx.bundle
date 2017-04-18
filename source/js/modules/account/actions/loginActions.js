import {LOGIN, LOGOUT, LOGIN_INFO} from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const login = {
	request: (email, pass, redirectUrl) => createAction(LOGIN.REQUEST, {email, pass, redirectUrl}),
	success: (response) => createAction(LOGIN.SUCCESS, {response}),
	failure: (error) => createAction(LOGIN.FAILURE, {error})
};

export const logOut = () => createAction(LOGOUT);

export const loginInfo = {
	request: () => createAction(LOGIN_INFO.REQUEST),
	success: (response) => createAction(LOGIN_INFO.SUCCESS, {response}),
	failure: (error) => createAction(LOGIN_INFO.FAILURE, {error})
};
