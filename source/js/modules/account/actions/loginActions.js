import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const login = {
	request: (email, pass, redirectUrl) => createAction(actions.LOGIN.REQUEST, {email, pass, redirectUrl}),
	success: (response) => createAction(actions.LOGIN.SUCCESS, {response}),
	failure: (error) => createAction(actions.LOGIN.FAILURE, {error})
};

export const logOut = () => createAction(actions.LOGOUT);
export const checkingAccessStart = () => createAction(actions.CHECKING_ACCESS_START);
export const checkingAccessStop = () => createAction(actions.CHECKING_ACCESS_STOP);

