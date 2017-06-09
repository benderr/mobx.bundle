import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const register = {
	request: (email, pass, redirectUrl) => createAction(actions.REGISTER.REQUEST, {email, pass, redirectUrl}),
	success: (response) => createAction(actions.REGISTER.SUCCESS, {response}),
	failure: (error) => createAction(actions.REGISTER.FAILURE, {error})
};
