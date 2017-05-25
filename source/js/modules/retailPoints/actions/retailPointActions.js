import * as actions from '../enums/actions'
import {createAction} from 'infrastructure/helpers/actionHelpers'

export const getRetailPoints = {
	request: () => createAction(actions.GET_RETAIL_POINTS.REQUEST),
	success: (response) => createAction(actions.GET_RETAIL_POINTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_RETAIL_POINTS.FAILURE, {error})
};

export const addRetailPoint = {
	request: (point) => createAction(actions.ADD_RETAIL_POINT.REQUEST, {point}),
	success: (response) => createAction(actions.ADD_RETAIL_POINT.SUCCESS, {response}),
	failure: (error) => createAction(actions.ADD_RETAIL_POINT.FAILURE, {error})
};


export const setRetailPoint = (id) => createAction(actions.SET_RETAIL_POINT, {id});