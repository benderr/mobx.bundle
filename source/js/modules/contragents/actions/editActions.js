import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const openDetail = (contragent) => createAction(actions.OPEN_DETAIL_ITEM, {contragent});
export const changeRole = (roles, code) => createAction(actions.CHANGE_ROLE, {roles, code});

export const createContragent = {
	request: (contragent) => createAction(actions.CREATE_CONTRAGENT.REQUEST, {contragent}),
	success: (response) => createAction(actions.CREATE_CONTRAGENT.SUCCESS, {response}),
	failure: (error) => createAction(actions.CREATE_CONTRAGENT.FAILURE, {error})
};
export const updateContragent = {
	request: (contragent, code) => createAction(actions.UPDATE_CONTRAGENT.REQUEST, {contragent, code}),
	success: (response) => createAction(actions.UPDATE_CONTRAGENT.SUCCESS, {response}),
	failure: (error) => createAction(actions.UPDATE_CONTRAGENT.FAILURE, {error})
};