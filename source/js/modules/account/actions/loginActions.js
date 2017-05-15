import {LOGIN, LOGOUT} from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const login = {
	request: (email, pass, redirectUrl) => createAction(LOGIN.REQUEST, {email, pass, redirectUrl}),
	success: (response) => createAction(LOGIN.SUCCESS, {response}),
	failure: (error) => createAction(LOGIN.FAILURE, {error})
};

export const logOut = () => createAction(LOGOUT);

