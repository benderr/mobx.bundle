/**
 * Created by RobertSabiryanov on 16.05.17.
 */
import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const getRetailPoints={
	request: () => createAction(actions.GET_RETAIL_POINT.REQUEST),
	success: (response) => createAction(actions.GET_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_RETAIL_POINT.FAILURE, {error})

};


