/**
 * Created by RobertSabiryanov on 13.05.17.
 */
import * as actions from '../enums/actions';
import {createAction} from 'infrastructure/helpers/actionHelpers';

export const getProducts = {
	request: (retailPointId, start, count, filter, sort) => createAction(actions.GET_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	requestWithFilter: (retailPointId, start, count, filter, sort) => createAction(actions.GET_FILTRED_PRODUCTS.REQUEST, {
		retailPointId,
		start,
		count,
		filter,
		sort
	}),
	success: (response) => createAction(actions.GET_PRODUCTS.SUCCESS, {response}),
	failure: (error) => createAction(actions.GET_PRODUCTS.FAILURE, {error})
};

export const getProductDetails = {
	request: ({inventCode, point, catalog}) => createAction(actions.GET_PRODUCT_DETAIL.REQUEST, {
		inventCode,
		point,
		catalog
	}),
	success: ({product}) => createAction(actions.GET_PRODUCT_DETAIL.SUCCESS, {product}),
	failure: ({inventCode, error}) => createAction(actions.GET_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};


export const saveProductDetails = {
	request: ({point, product}) => createAction(actions.SAVE_PRODUCT_DETAIL.REQUEST, {
		point,
		product
	}),
	success: ({product}) => createAction(actions.SAVE_PRODUCT_DETAIL.SUCCESS, {product}),
	failure: ({inventCode, error}) => createAction(actions.SAVE_PRODUCT_DETAIL.FAILURE, {inventCode, error})
};

export const saveModifierGroup = ({inventCode, group}) => createAction(actions.SAVE_MODIFIER_GROUP, {
	inventCode,
	group
});

export const removeModifierGroup = ({inventCode, groupId}) => createAction(actions.REMOVE_MODIFIER_GROUP, {
	inventCode,
	groupId
});

export const saveModifier = ({inventCode, groupId, modifier}) => createAction(actions.SAVE_MODIFIER, {
	inventCode,
	groupId,
	modifier
});

export const removeModifier = ({inventCode, groupId, modifierId}) => createAction(actions.REMOVE_MODIFIER, {
	inventCode,
	groupId,
	modifierId
});

export const destroyProductDetails = ({inventCode}) => createAction(actions.SAVE_MODIFIER);

